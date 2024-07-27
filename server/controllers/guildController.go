package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/models"

	"github.com/gin-gonic/gin"
)

func GetGuildProg(c *gin.Context) {
	var result map[string]interface{}

	/*
	*		TODO: once OAuth junk is finished, grab the favorited character and
	*					get realm/guild name
	* https://raider.io/api/v1/guilds/profile?region=us&realm=stormrage&name=inexorable&fields=raid_progression
	 */
	region := "us"
	realm := "stormrage"
	guild := "inexorable"

	requestURI := fmt.Sprintf("https://raider.io/api/v1/guilds/profile?region=%s&realm=%s&name=%s&fields=raid_progression", region, realm, guild)

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

	//Grab "raid_progression" property
	guildProg, ok := result["raid_progression"].({}interface{})
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse guild progresssion"})
		return
	}

	var extractedRaid models.GuildProgModel

	//Walk through the extracted "amirdrassil-the-dreams-hope" property
	for _, run := range guildProg {
		//checking to see if runMap map[string]interface{}
		// *** map[string]interface{} is a collection of methods and custome types,
		// 			being typed asserted to an array of strings ***
		runMap, ok := run.(map[string]interface{})
		if !ok {
			continue
		}

		guildName, ok1 := runMap["name"].(string)
		raidName := "amirdrassil-the-dreams-hope"
		summary, ok2 := runMap["summary"].(string)
		totalBosses, ok3 := runMap["total_bosses"].(float64)
		normalKills, ok4 := runMap["normal_bosses_killed"].(float64)
		heroicKills, ok5 := runMap["heroic_bosses_killed"].(float64)
		mythicKills, ok6 := runMap["mythic_bosses_killed"].(float64)

		if !ok1 || !ok2 || !ok3 || !ok4 || !ok5 || !ok6 {
			fmt.Println("Field check: guild name(%v) summary(%v) totalBosses(%v) normal(%v) heroic(%v) mythic(%v)", ok1, ok2, ok3, ok4, ok5, ok6)
			continue
		}

		//final entry to be returned to frontend
		extractedRaid := models.ExtractedGuildProg{
			GuildName:   guildName,
			RaidName:    raidName,
			Summary:     summary,
			TotalBosses: int64(totalBosses),
			NormalKills: int64(normalKills),
			HeroicKills: int64(heroicKills),
			MythicKills: int64(mythicKills),
		}

		fmt.Printf("Extracted Raid: %+v\n", extractedRaid)
	}

	c.JSON(http.StatusOK, extractedRaid)
}
