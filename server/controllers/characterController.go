package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"server/models"

	"github.com/gin-gonic/gin"
)

func GetCharacterStats(c *gin.Context) {
	var character models.CharacterStatModel

	region := "us"
	realm := "stormrage"
	characterName := "foxxghost"

	requestURI := fmt.Sprintf("https://us.api.blizzard.com/profile/wow/character/%s/%s/statistics?namespace=profile-%s&locale=en_US&access_token=USjKnCsJOPG8pBEdRej19KE7wcxyXkToZy", realm, characterName, region)

	resp, err := http.Get(requestURI)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch data"})
		return
	}
	defer resp.Body.Close()

	// Read and log the response body
	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read response body"})
		return
	}

	// Print the response body for debugging
	fmt.Println(string(bodyBytes))

	// Reset the response body reader
	resp.Body = io.NopCloser(bytes.NewReader(bodyBytes))

	if err := json.NewDecoder(resp.Body).Decode(&character); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode response", "details": err.Error()})
		return
	}

	extractedChar := models.ExtractedCharacterStat{
		Health:      character.Health,
		Power:       character.Power,
		Speed:       character.Speed.Rating,
		Strength:    character.Strength.Effective,
		Agility:     character.Agility.Effective,
		Intellect:   character.Intellect.Effective,
		Stamina:     character.Stamina.Effective,
		MeleeCrit:   character.MeleeCrit.Value,
		MeleeHaste:  character.MeleeHaste.Value,
		Mastery:     character.Mastery.Value,
		BonusArmor:  character.BonusArmor,
		Lifesteal:   character.Lifesteal.Value,
		Versatility: character.Versatility,
		AttackPower: character.AttackPower,
		SpellPower:  character.SpellPower,
		SpellCrit:   character.SpellCrit.Value,
		RangedCrit:  character.RangedCrit.Value,
		RangedHaste: character.RangedHaste.Value,
		SpellHaste:  character.SpellHaste.Value,
		Character:   character.Character.Name,
	}

	c.JSON(http.StatusOK, extractedChar)
}

func GetCharacterGear(c *gin.Context) {
	var gear models.Gear

	region := "us"
	realm := "stormrage"
	characterName := "foxxghost"

	requestURI := fmt.Sprintf("https://raider.io/api/v1/characters/profile?region=%s&realm=%s&name=%s&fields=gear", region, realm, characterName)

	resp, err := http.Get(requestURI)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch data"})
		return
	}
	defer resp.Body.Close()

	// Read and log the response body
	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read response body"})
		return
	}

	// Print the response body for debugging
	fmt.Println("Response body:", string(bodyBytes))

	// Reset the response body reader
	resp.Body = io.NopCloser(bytes.NewReader(bodyBytes))
	// Decode the JSON response into the gear struct
	if err := json.NewDecoder(resp.Body).Decode(&gear); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode response", "details": err.Error()})
		return
	}
	/*
		// Extract the Items field
		items := gear.Items */

	// Return the Items field as JSON
	c.JSON(http.StatusOK, string(bodyBytes))
}
