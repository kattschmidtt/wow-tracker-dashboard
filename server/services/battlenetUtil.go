package services

import (
	"context"
	"fmt"
	"server/config"

	"golang.org/x/oauth2"
)

// take in nothing, return a string and/or error
func GetBearerToken() string {
	oauthConfig := config.AppConfig.BattlenetLoginConfig

	//fetching the new token with pre-constructed oauth information (config.go)
	tokenSource := oauthConfig.TokenSource(context.Background(), &oauth2.Token{})
	token, err := tokenSource.Token()

	if err != nil {
		fmt.Println("Failed to fetch berer token: ", err)
		return string(err.Error())
	}

	if token == nil {
		fmt.Println("error: token in nil")
		return "waawerawe"
	}

	return token.AccessToken
}
