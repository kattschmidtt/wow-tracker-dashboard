package controllers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

func GetCurrentAffixList(c *fiber.Ctx) error {
	var result map[string]interface{}

	resp, err := http.Get("https://raider.io/api/v1/mythic-plus/affixes?region=us&locale=en")
	if err != nil {
		log.Fatalln(err)
	}
	defer resp.Body.Close()

	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		log.Fatalln(err)
	}

	return c.JSON(result["affix_details"])
}
