package initializers

import (
	"log"
	"server/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDB() {
	var err error
	dsn := "host=localhost user=foxx password=admin dbname=wow-tracker-dashboard port=5432 sslmode=prefer"
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect to database.")
	}
}

func AutoMigrateCharacter() {
	DB.AutoMigrate(&models.Character{}, &models.WowAccount{})
}
