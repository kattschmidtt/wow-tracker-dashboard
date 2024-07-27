package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/models"
	"time"

	"github.com/gin-gonic/gin"
)

func GetSeasonalDungeonList(c *gin.Context) {
	var result map[string]interface{}

	/*
	*		TODO: once OAuth junk is finished, grab the favorited character and
	*					get realm/character name
	 */
	realm := "stormrage"
	character := "foxxghost"

	requestURI := fmt.Sprintf("https://raider.io/api/v1/characters/profile?region=us&realm=%s&name=%s&fields=mythic_plus_best_runs", realm, character)

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

	//Grab "mythic_plus_best_runs" property
	bestRuns, ok := result["mythic_plus_best_runs"].([]interface{})
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse best runs"})
		return
	}

	var extractedRuns models.ExtractedBestRuns

	//Walk through the extracted "mythic_plus_best_runs" property
	for _, run := range bestRuns {
		//checking to see if runMap map[string]interface{}
		// *** map[string]interface{} is a collection of methods and custome types,
		// 			being typed asserted to an array of strings ***
		runMap, ok := run.(map[string]interface{})
		if !ok {
			continue
		}

		completedAtStr, ok4 := runMap["completed_at"].(string)
		dungeon, ok1 := runMap["dungeon"].(string)
		mythicLevel, ok2 := runMap["mythic_level"].(float64)
		score, ok3 := runMap["score"].(float64)
		affixList, ok5 := runMap["affixes"].([]interface{}) //parse as array
		clearTime, ok6 := runMap["clear_time_ms"].(float64)

		if !ok1 || !ok2 || !ok3 || !ok4 || !ok5 || !ok6 {
			fmt.Println("Field check: dungeon(%v) mythic_level(%v) score(%v) completed_at(%v) affixes(%v) clearTime(%v)", ok1, ok2, ok3, ok4, ok5, ok6)
			continue
		}

		//pretty print date format: YYYY-MM-DDTHH:MM:SS.SS
		completedAt, err := time.Parse(time.RFC3339, completedAtStr)
		if err != nil {
			continue
		}

		//looping through every element in affixList and checking each element is of type map[string]interface{}
		var affixes []models.AffixesBestRun
		for _, affix := range affixList {
			affixListIndex, ok := affix.(map[string]interface{})
			if !ok {
				continue
			}

			//creating the affixItem to be appended to final affixes
			affixItem := models.AffixesBestRun{

				Description: getStringField(affixListIndex, "description"),
				Icon:        getStringField(affixListIndex, "icon"),
				Id:          getIntField(affixListIndex, "id"),
				Name:        getStringField(affixListIndex, "name"),
				WowheadUrl:  getStringField(affixListIndex, "wowhead_url"),
			}

			affixes = append(affixes, affixItem)
		}

		if err != nil {
			fmt.Println("Failed to convert clearTimeMsStr to int:", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Conversion failed"})
			return
		}

		//final entry to be returned to frontend
		extractedRun := models.ExtractedRun{
			CompletedAt: completedAt,
			Dungeon:     dungeon,
			Level:       int(mythicLevel),
			Score:       int64(score),
			AffixList:   affixes,
			ClearTimeMs: int(clearTime),
		}

		fmt.Printf("Extracted Run: %+v\n", extractedRun)

		extractedRuns = append(extractedRuns, extractedRun)
	}

	c.JSON(http.StatusOK, extractedRuns)
}

// helper
func getStringField(m map[string]interface{}, key string) string {
	if val, ok := m[key].(string); ok {
		return val
	}
	return ""
}

func getIntField(m map[string]interface{}, key string) int {
	if val, ok := m[key].(float64); ok {
		return int(val)
	}
	return 0
}
