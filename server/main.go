package main

import (
	"log"
	"server/config"
	"server/controllers"

	"github.com/gin-gonic/gin"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
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

	app := fiber.New()

	//enable cors
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000",
		AllowHeaders:     "Origin, Content-Type, Accept",
		AllowMethods:     "GET, POST, OPTIONS",
		AllowCredentials: true,
	}))

	config.BattlenetConfig()

	app.Get("/battlenet_login", controllers.BattlenetLogin)
	app.Post("/battlenet_callback", controllers.BattlenetCallback)

	//app.Get("/getChars", controllers.GetChars)
	app.Get("/affixes", controllers.GetCurrentAffixList)
	app.Get("/getSeasonalDungeons", controllers.GetSeasonalDungeonList)
	app.Get("/getGuildProgress", controllers.GetGuildProg)
	app.Get("/staticRaidData", controllers.GetRaidInfo)
	app.Get("/characterStats", controllers.GetCharacterStats)
	app.Get("/guildMembers", controllers.GetGuildMembers)
	app.Get("/killedOn", controllers.GetKilledOn)
	app.Get("/detailedEncounter", controllers.GetDetailedBossKill)
	app.Get("/killRank", controllers.GetGuildKillRank)

	/*app.Get("/characterGear", controllers.GetCharacterGear)
	app.Get("/characterTalents", controllers.GetCharacterTalents) */

	log.Println("Starting server on :8080")
	app.Listen(":8080")
}
