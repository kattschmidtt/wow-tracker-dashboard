package controllers

import (
	"server/initializers"
	"server/models"

	"github.com/gin-gonic/gin"
)

func GetChars(c *gin.Context) {
	var characters models.UserProfile

	initializers.DB.Find(&characters.WowAccounts)

	c.JSON(200, gin.H{
		"characters": characters,
	})
}
