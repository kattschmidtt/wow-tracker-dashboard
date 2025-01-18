package controllers

import (
	"context"
	"io/ioutil"
	"net/http"

	"server/config"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/oauth2"
)

func BattlenetLogin(c *fiber.Ctx) error {
	url := config.AppConfig.BattlenetLoginConfig.AuthCodeURL("randomstate", oauth2.AccessTypeOffline)

	c.Status(fiber.StatusSeeOther)
	c.Redirect(url)
	return nil
}

func BattlenetCallback(c *fiber.Ctx) error {
	state := c.Query("state")
	if state != "randomstate" {
		return c.Status(fiber.StatusBadRequest).SendString("States do not match!")
	}

	code := c.Query("code")
	battlenetConfig := config.BattlenetConfig()

	token, err := battlenetConfig.Exchange(context.Background(), code)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Code-Token exchange failed!")
	}

	resp, err := http.Get("https://www.oauth.battle.net/oauth/userinfo?region=us&access_token=" + token.AccessToken)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("User data fetch failed!")
	}
	defer resp.Body.Close()

	userData, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("JSON parsing failed")
	}

	// Return user data as JSON
	return c.Status(fiber.StatusOK).Send(userData)
}
