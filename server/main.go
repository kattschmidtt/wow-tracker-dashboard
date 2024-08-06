package main

import (
	"database/sql"
	"log"
	"server/controllers"
	"server/initializers"
	"server/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var db *sql.DB

func init() {
	initializers.ConnectToDB()
	initializers.AutoMigrateCharacter()
}

func TestGet(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}

func main() {
	r := routes.SetupRouter()
	r.Use(cors.Default())
	r.GET("/ping", TestGet)
	r.GET("/getChars", controllers.GetChars)
	r.GET("/affixes", controllers.GetCurrentAffixList)
	r.GET("/getSeasonalDungeons", controllers.GetSeasonalDungeonList)
	r.GET("/getGuildProgress", controllers.GetGuildProg)
	r.GET("/staticRaidData", controllers.GetRaidInfo)
	r.GET("/characterStats", controllers.GetCharacterStats)
	r.GET("/characterGear", controllers.GetCharacterGear)

	log.Println("Starting server on :8080")
	r.Run(":8080")
}
