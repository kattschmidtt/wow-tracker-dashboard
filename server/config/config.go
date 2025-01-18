package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
)

type Config struct {
	BattlenetLoginConfig oauth2.Config
}

var AppConfig Config

func BattlenetConfig() oauth2.Config {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Failed to load .env file")
	}

	AppConfig.BattlenetLoginConfig = oauth2.Config{
		RedirectURL:  "http://localhost:3000",
		ClientID:     os.Getenv("BATTLENET_CLIENT_ID"),
		ClientSecret: os.Getenv("BATTLENET_CLIENT_SECRET"),
		Scopes:       []string{"wow.profile"},
		Endpoint: oauth2.Endpoint{
			AuthURL:  "https://battle.net/oauth/authorize",
			TokenURL: "https://battle.net/oauth/token",
		},
	}

	return AppConfig.BattlenetLoginConfig
}
