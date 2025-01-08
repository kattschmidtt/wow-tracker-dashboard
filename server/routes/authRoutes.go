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

func InitAuthRoutes(r *gin.Engine) {
	r.GET("/auth/token", HandleAuthToken)
}
