package controllers

import (
	"server/initializers"
	"server/models"

	"github.com/gofiber/fiber/v2"
)

func GetChars(c *fiber.Ctx) error {
	var characters models.UserProfile

	initializers.DB.Find(&characters.WowAccounts)

	return c.JSON(fiber.Map{"characters": characters})
}
