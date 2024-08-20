package routes

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"server/models"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"github.com/parnurzeal/gorequest"
)

const (
	clientID     = "70fecafdbd534133802e791234e6769e"
	clientSecret = "0PmPCHQ8zvh8awEBiO0OX16m7ilwUeJ1"
	redirectURI  = "http://localhost:8080/callback"
	authURL      = "https://oauth.battle.net/authorize"
	tokenURL     = "https://oauth.battle.net/token"
	apiBaseURL   = "https://us.api.blizzard.com"
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
		c.String(http.StatusBadRequest, "Code not found")
		return
	}
	log.Println("Authorization code received:", code)

	accessToken, err := getAccessToken(code)
	if err != nil {
		log.Printf("Failed to get access token: %v\n", err)
		c.String(http.StatusInternalServerError, "Failed to get access token")
		return
	}
	log.Println("Access token received:", accessToken)

	c.SetCookie("access_token", accessToken, 3600, "/", "localhost", false, true)
	c.Redirect(http.StatusFound, "/profile/user/wow")
}

func profileHandler(c *gin.Context) {
	cookie, err := c.Cookie("access_token")
	if err != nil {
		c.Redirect(http.StatusFound, "/login")
		return
	}

	profile, err := getUserProfile(cookie)
	if err != nil {
		c.String(http.StatusInternalServerError, "Failed to get user profile")
		return
	}

	log.Println("User Profile JSON:", profile)

	var userProfile models.UserProfile
	err = json.Unmarshal([]byte(profile), &userProfile)
	if err != nil {
		log.Printf("Failed to parse user profile JSON: %v", err)
		c.String(http.StatusInternalServerError, fmt.Sprintf("Failed to parse user profile JSON: %v", err))
		return
	}

	connStr := "user=foxx password=admin dbname=wow-tracker-dashboard port=5432 sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
		c.String(http.StatusInternalServerError, "Failed to connect to database")
		return
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		log.Fatalf("Failed to ping the database: %v", err)
		c.String(http.StatusInternalServerError, "Failed to ping the database")
		return
	}

	sqlStatement := generateCreateTableSQL()
	_, err = db.Exec(sqlStatement)
	if err != nil {
		log.Printf("Failed to create table: %v", err)
		c.String(http.StatusInternalServerError, fmt.Sprintf("Failed to create table: %v", err))
		return
	}

	for _, wowAccount := range userProfile.WowAccounts {
		for _, character := range wowAccount.Characters {
			_, err = db.Exec(`
							INSERT INTO user_profiles (wow_account_id, character_name, character_id, realm_name, playable_class, playable_race, gender, faction, level)
							VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
				wowAccount.ID, character.Name, character.ID, toJSON(character.Realm.Name), toJSON(character.PlayableClass.Name), toJSON(character.PlayableRace.Name), toJSON(character.Gender.Name), toJSON(character.Faction.Name), character.Level)
			if err != nil {
				log.Printf("Failed to insert data into table: %v", err)
				c.String(http.StatusInternalServerError, fmt.Sprintf("Failed to insert data into table: %v", err))
				return
			}
		}
	}

	c.String(http.StatusOK, "User Profile: %s", profile)
}

func toJSON(value interface{}) string {
	jsonValue, err := json.Marshal(value)
	if err != nil {
		log.Printf("Failed to marshal JSON: %v", err)
		return ""
	}
	return string(jsonValue)
}

func generateCreateTableSQL() string {
	return `
	CREATE TABLE IF NOT EXISTS user_profiles (
			id SERIAL PRIMARY KEY,
			wow_account_id INT,
			character_name VARCHAR(255),
			character_id INT,
			realm_name JSONB,
			playable_class JSONB,
			playable_race JSONB,
			gender JSONB,
			faction JSONB,
			level INT
	);
	`
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
	fmt.Printf(body)
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
