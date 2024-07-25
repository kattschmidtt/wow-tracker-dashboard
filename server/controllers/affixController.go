package controllers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetCurrentAffixList(c *gin.Context) {
	var result map[string]interface{}

	resp, err := http.Get("https://raider.io/api/v1/mythic-plus/affixes?region=us&locale=en")
	if err != nil {
		log.Fatalln(err)
		return
	}
	defer resp.Body.Close()

	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		log.Fatalln(err)
		return
	}

	c.JSON(http.StatusOK, result["affix_details"])
}
