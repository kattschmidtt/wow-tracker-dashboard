package routes

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/joho/godotenv"
)

func loadEnvVariables() error {
	err := godotenv.Load()
	if err != nil {
		return fmt.Errorf("Error loading .env file")
	}
	return nil
}

func getBearerToken() (string, error) {
	err := loadEnvVariables()
	if err != nil {
		return "", err
	}

	clientID := os.Getenv("BNET_CLIENT_ID")
	clientSecret := os.Getenv("BNET_CLIENT_SECRET")
	if clientID == "" || clientSecret == "" {
		return "", fmt.Errorf("client_id or client_secret is not set in environment variables")
	}

	reqBody := url.Values{
		"grant_type": {"client_credentials"},
	}.Encode()

	//posting our token to oauth bnet server
	req, err := http.NewRequest("POST", "https://oauth.battle.net/token", strings.NewReader(reqBody))
	if err != nil {
		return "", fmt.Errorf("failed to create request: %v", err)
	}

	//auth header
	req.SetBasicAuth(clientID, clientSecret)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("Access-Control-Allow-Origin", "*")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", fmt.Errorf("failed to send request: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("failed to get token: %s", body)
	}

	var tokenResponse struct {
		AccessToken string `json:"access_token"`
		TokenType   string `json:"token_type"`
		ExpiresIn   int    `json:"expires_in"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&tokenResponse); err != nil {
		return "", fmt.Errorf("failed to decode token response: %v", err)
	}
	return tokenResponse.AccessToken, nil
}

// get the bearer and return it in the response
func HandleAuthToken(c *gin.Context) {
	token, err := getBearerToken()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//send token to frontend
	c.JSON(http.StatusOK, gin.H{"access_token": token})
}

func RedirectToBlizzardAuth(c *gin.Context) {
	err := loadEnvVariables()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error loading .env file"})
		return
	}

	clientID := os.Getenv("BNET_CLIENT_ID")
	redirectURI := os.Getenv("REDIRECT_URI")

	state := uuid.New().String()
	c.SetCookie("oauth_state", state, 300, "/", "", false, true)
	c.Header("Access-Control-Allow-Origin", "*")

	authURL := fmt.Sprintf(
		"https://oauth.battle.net/authorize?client_id=%s&redirect_uri=%s&response_type=code&scope=openid&state=%s",
		clientID,
		url.QueryEscape(redirectURI),
		state,
	)

	c.Redirect(http.StatusFound, authURL)
}

func HandleCallback(c *gin.Context) {
	err := loadEnvVariables()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error loading .env file"})
		return
	}

	clientID := os.Getenv("BNET_CLIENT_ID")
	clientSecret := os.Getenv("BNET_CLIENT_SECRET")
	redirectURI := os.Getenv("REDIRECT_URI")

	code := c.Query("code")
	state := c.Query("state")

	savedState, err := c.Cookie("oauth_state")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "State not found in cookies"})
		return
	}

	if state == "" || state != savedState {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid or missing state parameter"})
		return
	}

	if code == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Authorization code not provided"})
		return
	}

	reqBody := url.Values{
		"grant_type":   {"authorization_code"},
		"code":         {code},
		"redirect_uri": {redirectURI},
	}.Encode()

	req, err := http.NewRequest("POST", "https://oauth.battle.net/token", strings.NewReader(reqBody))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create request"})
		return
	}

	req.SetBasicAuth(clientID, clientSecret)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request"})
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		c.JSON(http.StatusBadRequest, gin.H{"error": string(body)})
		return
	}

	var tokenResponse struct {
		AccessToken string `json:"access_token"`
		TokenType   string `json:"token_type"`
		ExpiresIn   int    `json:"expires_in"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&tokenResponse); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode response"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"access_token": tokenResponse.AccessToken})
}

func GetUserInfo(c *gin.Context) {
	//get token
	accessToken := c.Query("access_token")
	if accessToken == "" {
		accessToken = c.GetHeader("Authorization")
		if strings.HasPrefix(accessToken, "Bearer ") {
			accessToken = strings.TrimPrefix(accessToken, "Bearer ")
		}
	}

	if accessToken == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Access token not provided"})
		return
	}

	//blizz userinfo endpoint
	req, err := http.NewRequest("GET", "https://oauth.battle.net/oauth/userinfo?region=us", nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create request"})
		return
	}

	//bearer token
	req.Header.Set("Authorization", "Bearer "+accessToken)
	req.Header.Set("Access-Control-Allow-Origin", "*")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request"})
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		c.JSON(http.StatusBadRequest, gin.H{"error": string(body)})
		return
	}

	var userInfo map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode user info"})
		return
	}

	c.JSON(http.StatusOK, userInfo)
}

func InitAuthRoutes(r *gin.Engine) {
	r.GET("/api/auth/redirect", RedirectToBlizzardAuth)
	r.GET("/api/auth/callback", HandleCallback)
	r.GET("/api/auth/userinfo", GetUserInfo)
}
