package initializers

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDB() {
	var err error
	dsn := "host=<DB HOSTURL> user=<DB USERNAME> password=<DB PASSWORD> dbname=<DB TABLE NAME> port=<DB PORT> sslmode=prefer"
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect to database.")
	}
}
