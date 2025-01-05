package routes

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"github.com/parnurzeal/gorequest"
)

const (
	clientID      = "70fecafdbd534133802e791234e6769e"
	clientSecret  = "Vx2xsUBLneWMBUtLZgFtmj2n414OP00H"
	redirectURI   = "http://localhost:8080/callback"
	authURL       = "https://oauth.battle.net/authorize"
	tokenURL      = "https://oauth.battle.net/token"
	apiBaseURL    = "https://us.api.blizzard.com"
	battleNetAuth = "https://oauth.battle.net/oauth"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.GET("/", homeHandler)
	r.GET("/login", loginHandler)
	r.GET("/callback", callbackHandler)
	r.GET("/profile/user/wow", profileHandler)

	return r
}

func homeHandler(c *gin.Context) {
	c.Writer.WriteString(`<a href="/login">Log in with Blizzard</a>`)
}

func loginHandler(c *gin.Context) {
	authURL := fmt.Sprintf("%s?client_id=%s&redirect_uri=%s&response_type=code&scope=openid wow.profile&state=awaefawefw", authURL, clientID, url.QueryEscape(redirectURI))
	log.Println("Redirecting to auth URL:", authURL)
	c.Redirect(http.StatusFound, authURL)
}

func callbackHandler(c *gin.Context) {
	code := c.Query("code")
	if code == "" {
		c.String(http.StatusBadRequest, "Authorization code not found")
		return
	}

	accessToken, err := getAccessToken(code)
	if err != nil {
		log.Printf("Failed to get access token: %v", err)
		c.String(http.StatusInternalServerError, "Failed to get access token")
		return
	}

	battleNetInfo, err := getBattleNetAccountInfo(accessToken)
	if err != nil {
		log.Printf("Failed to fetch user info: %v", err)
		c.String(http.StatusInternalServerError, "Failed to fetch user info")
		return
	}
	c.SetCookie("access_token", accessToken, 3600, "/", "localhost", false, true)

	//only allow userInfo to be sent
	c.JSON(http.StatusOK, battleNetInfo)
}

func profileHandler(c *gin.Context) {
	cookie, err := c.Cookie("access_token")
	if err != nil {
		c.Redirect(http.StatusFound, "/login")
		return
	}

	profile, err := getUserProfile(cookie)
	if err != nil {
		log.Printf("Failed to get user profile: %v", err)
		c.String(http.StatusInternalServerError, "Failed to get user profile")
		return
	}

	c.Header("Content-Type", "application/json")
	c.String(http.StatusOK, profile)
}

func toJSON(value interface{}) string {
	jsonValue, err := json.Marshal(value)
	if err != nil {
		log.Printf("Failed to marshal JSON: %v", err)
		return ""
	}
	return string(jsonValue)
}

func getAccessToken(code string) (string, error) {
	request := gorequest.New()
	payload := fmt.Sprintf("grant_type=authorization_code&code=%s&redirect_uri=%s", code, url.QueryEscape(redirectURI))
	log.Println("Token request payload:", payload)

	resp, body, errs := request.Post(tokenURL).
		SetBasicAuth(clientID, clientSecret).
		Set("Content-Type", "application/x-www-form-urlencoded").
		Send(payload).
		End()

	if len(errs) > 0 {
		return "", fmt.Errorf("failed to get access token: %v", errs)
	}

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("failed to get access token: %s", body)
	}

	var tokenResponse map[string]interface{}
	err := json.Unmarshal([]byte(body), &tokenResponse)
	if err != nil {
		return "", fmt.Errorf("failed to parse token response: %v", err)
	}
	//fmt.Printf(body)
	return tokenResponse["access_token"].(string), nil
}

func getUserProfile(accessToken string) (string, error) {
	request := gorequest.New()
	resp, body, errs := request.Get(fmt.Sprintf("%s/profile/user/wow?namespace=profile-us", apiBaseURL)).
		Set("Authorization", fmt.Sprintf("Bearer %s", accessToken)).
		End()

	if len(errs) > 0 {
		return "", fmt.Errorf("failed to get user profile: %v", errs)
	}

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("failed to get user profile: %s", body)
	}

	return body, nil
}

func getBattleNetAccountInfo(accessToken string) (map[string]interface{}, error) {
	request := gorequest.New()
	resp, body, errs := request.Get("https://oauth.battle.net/oauth/userinfo").
		Set("Authorization", fmt.Sprintf("Bearer %s", accessToken)).
		End()

	if len(errs) > 0 {
		return nil, fmt.Errorf("failed to fetch user info: %v", errs)
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("failed to fetch user info: %s", body)
	}

	var userInfo map[string]interface{}
	err := json.Unmarshal([]byte(body), &userInfo)
	if err != nil {
		return nil, fmt.Errorf("failed to parse user info: %v", err)
	}

	return userInfo, nil
}
