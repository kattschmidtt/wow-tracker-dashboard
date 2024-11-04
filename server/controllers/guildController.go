package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/models"

	"github.com/gin-gonic/gin"
)

func GetGuildProg(c *gin.Context) {
	var result models.GuildProgModel

	/*
	*		TODO: once OAuth junk is finished, grab the favorited character and
	*					get realm/guild name
	* https://raider.io/api/v1/guilds/profile?region=us&realm=stormrage&name=inexorable&fields=raid_progression
	 */
	region := "us"
	realm := "Proudmoore"
	guild := "Acrimonious"

	requestURI := fmt.Sprintf("https://raider.io/api/v1/guilds/profile?region=%v&realm=%v&name=%v&fields=raid_progression", region, realm, guild)

	resp, err := http.Get(requestURI)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch data"})
		return
	}
	defer resp.Body.Close()

	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode response"})
		return
	}

	fmt.Println(result)

	raidProgression := result.RaidProgression.NeruBarPalace
	fmt.Println(raidProgression)

	//final entry to be returned to frontend
	extractedRaid := models.ExtractedGuildProg{
		GuildName:   result.Name,
		RaidName:    "nerubar-palace",
		Summary:     raidProgression.Summary,
		TotalBosses: int64(raidProgression.TotalBosses),
		NormalKills: int64(raidProgression.NormalBossesKilled),
		HeroicKills: int64(raidProgression.HeroicBossesKilled),
		MythicKills: int64(raidProgression.MythicBossesKilled),
	}

	c.JSON(http.StatusOK, extractedRaid)
}

func GetRaidInfo(c *gin.Context) {
	var result models.StaticRaidModel

	// Expansion ID to get slugs for. 9 = Dragonflight, 8 = Shadowlands, 7 = Battle for Azeroth, 6 = Legion
	expansionId := 10
	requestURI := fmt.Sprintf("https://raider.io/api/v1/raiding/static-data?expansion_id=%d", expansionId)

	resp, err := http.Get(requestURI)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch raid static slug data"})
		return
	}
	defer resp.Body.Close()

	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode raid static slug data response"})
		return
	}

	fmt.Println("result: ", result)

	//Since the raider.io api sends back ALL raids within an expansion, we are only grabbing
	// the most recent tier based on the non slug name. We will use the IDs returned from raid.Encounters
	// to create links to the correlating wowhead articles for guides and other info
	targetRaidName := "Nerub-ar Palace"

	//filtering the extracted counters based on targetRaidName and adding them to response json
	var filteredEncounters []gin.H
	for _, raid := range result.Raids {
		if raid.Name == targetRaidName {
			for _, encounter := range raid.Encounters {
				encounterData := gin.H{
					"id":   encounter.ID,
					"slug": encounter.Slug,
					"name": encounter.Name,
				}
				filteredEncounters = append(filteredEncounters, encounterData)
			}
			break
		}
	}

	fmt.Println(filteredEncounters)

	//error handling
	if len(filteredEncounters) > 0 {
		c.JSON(http.StatusOK, filteredEncounters)
	} else {
		c.JSON(http.StatusOK, gin.H{"message": "No filtered encounters found"})
	}
}

func main() {
	r := gin.Default()
	r.GET("/raidinfo", GetRaidInfo)
	r.Run(":8080")
}
