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

	raidProgression := result.RaidProgression.AmirdrassilTheDreamsHope

	//final entry to be returned to frontend
	extractedRaid := models.ExtractedGuildProg{
		GuildName:   result.Name,
		RaidName:    "amidrassil-the-dreams-hope",
		Summary:     raidProgression.Summary,
		TotalBosses: int64(raidProgression.TotalBosses),
		NormalKills: int64(raidProgression.NormalBossesKilled),
		HeroicKills: int64(raidProgression.HeroicBossesKilled),
		MythicKills: int64(raidProgression.MythicBossesKilled),
	}

	c.JSON(http.StatusOK, extractedRaid)
}
