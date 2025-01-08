package main

import (
	"log"
	"server/controllers"
	"server/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func init() {
	//load .env
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}
}

func TestGet(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}

func main() {
	r := gin.Default()

	//cors middleware enabled
	r.Use(cors.Default())

	// ROUTES
	r.GET("/ping", TestGet)
	r.GET("/getChars", controllers.GetChars)
	r.GET("/affixes", controllers.GetCurrentAffixList)
	r.GET("/getSeasonalDungeons", controllers.GetSeasonalDungeonList)
	r.GET("/getGuildProgress", controllers.GetGuildProg)
	r.GET("/staticRaidData", controllers.GetRaidInfo)
	r.GET("/characterStats", controllers.GetCharacterStats)
	r.GET("/characterGear", controllers.GetCharacterGear)
	r.GET("/characterTalents", controllers.GetCharacterTalents)

	//init auth process
	routes.InitAuthRoutes(r)

	log.Println("Starting server on :8080")
	r.Run(":8080")
}
