package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"server/initializers"

	"github.com/gorilla/mux"
	"github.com/parnurzeal/gorequest"
)

const (
	clientID     = "CLIENT_ID"
	clientSecret = "CLIENT_SECRET"
	redirectURI  = "http://localhost:8080/callback"
	authURL      = "https://oauth.battle.net/authorize"
	tokenURL     = "https://oauth.battle.net/token"
	apiBaseURL   = "https://us.api.blizzard.com"
)

func init() {
	initializers.ConnectToDB()
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/", homeHandler)
	r.HandleFunc("/login", loginHandler)
	r.HandleFunc("/callback", callbackHandler)
	r.HandleFunc("/profile/user/wow", profileHandler)

	log.Println("Starting server on :8080")
	http.ListenAndServe(":8080", r)
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, `<a href="/login">Log in with Blizzard</a>`)
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	authURL := fmt.Sprintf("%s?client_id=%s&redirect_uri=%s&response_type=code&scope=openid wow.profile&state=awaefawefw", authURL, clientID, url.QueryEscape(redirectURI))
	log.Println("Redirecting to auth URL:", authURL)
	http.Redirect(w, r, authURL, http.StatusFound)
}

func callbackHandler(w http.ResponseWriter, r *http.Request) {
	code := r.URL.Query().Get("code")
	if code == "" {
		http.Error(w, "Code not found", http.StatusBadRequest)
		return
	}
	log.Println("Authorization code received:", code)

	accessToken, err := getAccessToken(code)
	if err != nil {
		log.Printf("Failed to get access token: %v\n", err)
		http.Error(w, "Failed to get access token", http.StatusInternalServerError)
		return
	}
	log.Println("Access token received:", accessToken)

	http.SetCookie(w, &http.Cookie{
		Name:  "access_token",
		Value: accessToken,
		Path:  "/",
	})

	http.Redirect(w, r, "/profile/user/wow", http.StatusFound)
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

	return tokenResponse["access_token"].(string), nil
}

func profileHandler(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("access_token")
	if err != nil {
		http.Redirect(w, r, "/login", http.StatusFound)
		return
	}

	profile, err := getUserProfile(cookie.Value)
	if err != nil {
		http.Error(w, "Failed to get user profile", http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "User Profile: %s", profile)
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
