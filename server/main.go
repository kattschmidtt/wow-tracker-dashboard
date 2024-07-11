package main

import (
	"log"
	"server/initializers"
	"server/routes"
)

func init() {
	initializers.ConnectToDB()
	initializers.AutoMigrateCharacter()
}

func main() {
	r := routes.SetupRouter()

	log.Println("Starting server on :8080")
	r.Run(":8080")
}
