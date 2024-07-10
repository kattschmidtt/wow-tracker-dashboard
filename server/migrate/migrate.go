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
		&models.User{},
		&models.WowAccount{},
		&models.Character{},
		&models.Links{},
		&models.Link{},
		&models.Realm{},
		&models.PlayableClass{},
		&models.PlayableRace{},
		&models.Gender{},
		&models.Faction{})

}
