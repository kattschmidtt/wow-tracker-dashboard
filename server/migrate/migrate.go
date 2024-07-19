package main

import (
	"server/initializers"
	"server/models"
)

func init() {
	initializers.ConnectToDB()
}

func main() {
	initializers.DB.AutoMigrate(
		&models.WowAccount{},
		&models.Character{},
		&models.Realm{},
		&models.Gender{},
		&models.Faction{})

}
