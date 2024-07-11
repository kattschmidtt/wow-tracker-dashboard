package controllers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"server/initializers"
	"server/models"

	"github.com/gin-gonic/gin"
)

func TestGet(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}

func CreateAccountInfoEntry(c *gin.Context, profileData string) {
	// Save user and associated wow accounts characters
	var character models.Character
	err := json.Unmarshal([]byte(profileData), &character)
	if err != nil {
		log.Printf("Failed to parse profile data: %v\n", err)
		c.String(http.StatusInternalServerError, "Failed to parse profile data")
		return
	}

	fmt.Println("Character Name:", character.Name)
	fmt.Println("Realm Name:", character.Realm.Name)
	fmt.Println("Playable Class Name:", character.PlayableClass.Name)

	// Save user and associated wow accounts and characters
	result := initializers.DB.Create(&character)
	if result.Error != nil {
		// Print the detailed error message to understand the issue
		log.Printf("Failed to save user: %v\n", result.Error)
		c.String(http.StatusInternalServerError, "Failed to save user: "+result.Error.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Account information saved successfully",
	})
}

func GetAccountInfo(c *gin.Context) {
	var characters []models.Character
	initializers.DB.Find(&characters)

	c.JSON(http.StatusOK, gin.H{
		"characters": characters,
	})
}
