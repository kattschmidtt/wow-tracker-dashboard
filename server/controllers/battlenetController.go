package controllers

import (
	"context"
	"io"
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

	client := http.Client{}
	req, err := http.NewRequest("GET", "https://oauth.battle.net/userinfo", nil)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error creating userinfo request!")
	}
	req.Header.Add("Authorization", "Bearer "+token.AccessToken)

	resp, err := client.Do(req)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("User data fetch failed!")
	}
	defer resp.Body.Close()

	userData, err := io.ReadAll(resp.Body)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("JSON parsing failed")
	}

	c.Redirect("http://localhost:3000")
	// Return user data as JSON
	return c.Status(fiber.StatusOK).Send(userData)
}
