package controllers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"server/models"

	"github.com/gin-gonic/gin"
	"github.com/gofiber/fiber/v2"
)

func GetGuildProg(c *fiber.Ctx) error {
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
		c.JSON(fiber.Map{"error": "Failed to fetch data"})
	}
	defer resp.Body.Close()

	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		c.JSON(fiber.Map{"error": "Failed to decode response"})
	}

	//fmt.Println(result)

	raidProgression := result.RaidProgression.NeruBarPalace
	//fmt.Println(raidProgression)

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

	return c.JSON(extractedRaid)
}

func GetRaidInfo(c *fiber.Ctx) error {
	var result models.StaticRaidModel

	// Expansion ID to get slugs for. 9 = Dragonflight, 8 = Shadowlands, 7 = Battle for Azeroth, 6 = Legion
	expansionId := 10
	requestURI := fmt.Sprintf("https://raider.io/api/v1/raiding/static-data?expansion_id=%d", expansionId)

	resp, err := http.Get(requestURI)
	if err != nil {
		c.JSON(fiber.Map{"error": "Failed to fetch raid static slug data"})
	}
	defer resp.Body.Close()

	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		c.JSON(fiber.Map{"error": "Failed to decode raid static slug data response"})

	}

	//fmt.Println("result: ", result)

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

	//fmt.Println("Filtered encounters: ", filteredEncounters)

	//error handling
	if len(filteredEncounters) > 0 {
		c.JSON(filteredEncounters)
	} else {
		c.JSON(fiber.Map{"message": "No filtered encounters found"})
	}
	return c.JSON(filteredEncounters)
}

func GetKilledOn(c *fiber.Ctx) error {
	var result models.BossKillModel
	region := "us"
	realm := "Proudmoore"
	guild := "Acrimonious"

	requestURI := fmt.Sprintf("https://raider.io/api/v1/guilds/profile?region=%v&realm=%v&name=%v&fields=raid_encounters%%3Anerubar-palace%%3Amythic", region, realm, guild)

	resp, err := http.Get(requestURI)
	if err != nil {
		c.JSON(fiber.Map{"error": "Failed to fetch data"})
	}
	defer resp.Body.Close()

	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		c.JSON(fiber.Map{"error": "Failed to decode response"})
	}

	//	fmt.Println(result)

	//only grabbing the raid_encounter array
	var filteredEncounters []fiber.Map
	for _, encounter := range result.RaidEncounters {
		filteredEncounters = append(filteredEncounters, fiber.Map{
			"slug":        encounter.Slug,
			"name":        encounter.Name,
			"defeated_at": encounter.DefeatedAt,
		})
	}

	//	fmt.Println(filteredEncounters)

	if len(filteredEncounters) > 0 {
		return c.JSON(filteredEncounters)
	}
	return c.JSON(fiber.Map{"message": "no encounter found"})
}

func GetGuildMembers(c *fiber.Ctx) error {
	//https://raider.io/api/v1/guilds/profile?region=us&realm=proudmoore&name=acrimonious&fields=members
	//GuildMembers model
	var result models.GuildMembers
	region := "us"
	realm := "Proudmoore"
	guild := "Acrimonious"

	requestURI := fmt.Sprintf("https://raider.io/api/v1/guilds/profile?region=%v&realm=%v&name=%v&fields=members", region, realm, guild)

	resp, err := http.Get(requestURI)
	if err != nil {
		c.JSON(fiber.Map{"error": "Failed to fetch data"})
	}
	defer resp.Body.Close()

	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		c.JSON(fiber.Map{"error": "Failed to decode response"})
	}

	memberList := result.Members

	if len(memberList) > 25 {
		memberList = memberList[:25]
	}
	fmt.Println(memberList)

	return c.JSON(memberList)
}

func GetDetailedBossKill(c *fiber.Ctx) error {
	//https://raider.io/api/v1/guilds/boss-kill?region=us&realm=proudmoore&guild=acrimonious&raid=nerubar-palace&boss=ulgrax-the-devourer&difficulty=mythic
	//http://localhost:8080/detailedEncounter?bossSlug=ulgrax-the-devourer
	region := "us"
	realm := "Proudmoore"
	guild := "Acrimonious"

	bossSlug := c.Query("bossSlug")
	if bossSlug == "" {
		return c.Status(fiber.StatusBadRequest).SendString("bossSlug must be present in url!")
	}

	requestURI := fmt.Sprintf("https://raider.io/api/v1/guilds/boss-kill?region=%v&realm=%v&guild=%v&raid=nerubar-palace&boss=%v&difficulty=mythic", region, realm, guild, bossSlug)

	resp, err := http.Get(requestURI)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(fmt.Sprintf("Error making GET request: %v", err))
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return c.Status(fiber.StatusBadRequest).SendString(fmt.Sprintf("Request failed with status: %d", resp.StatusCode))
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(fmt.Sprintf("Error reading response body: %v", err))
	}

	var result models.DetailedBossKillModel
	if err := json.Unmarshal(body, &result); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(fmt.Sprintf("Error unmarshaling JSON: %v", err))
	}

	var extractedData []models.CharacterPresentInfo
	for _, roster := range result.Roster {
		character := roster.Character
		extractedData = append(extractedData, models.CharacterPresentInfo{
			Name:              character.Name,
			RaceName:          character.Race.Name,
			RaceFaction:       character.Race.Faction,
			ClassName:         character.Class.Name,
			SpecName:          character.Spec.Name,
			SpecRole:          character.Spec.Role,
			SpecIsMelee:       character.Spec.IsMelee,
			ItemLevelEquipped: character.ItemLevelEquipped,
			RealmName:         character.Realm.Name,
			RealmSlug:         character.Realm.Slug,
			RegionSlug:        character.Region.Slug,
		})
	}

	return c.JSON(extractedData)
}

func GetGuildKillRank(c *fiber.Ctx) error {

	region := "us"
	realm := "proudmoore"
	guild := "acrimonious"

	requestURI := fmt.Sprintf("https://raider.io/api/v1/guilds/profile?region=%v&realm=%v&name=%v&fields=raid_rankings", region, realm, guild)
	resp, err := http.Get(requestURI)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(fmt.Sprintf("Error makiing GET request: %v", err))
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return c.Status(fiber.StatusBadRequest).SendString(fmt.Sprintf("Request failed with status: %d", err))
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(fmt.Sprintf("Error reading response body: %v", err))
	}

	var result models.GuildRank
	if err := json.Unmarshal(body, &result); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(fmt.Sprintf("Error unmarshaling JSON: %v", err))
	}

	return c.JSON(result)
}
