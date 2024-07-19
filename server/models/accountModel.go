package models

type UserProfile struct {
	Links       Links        `json:"_links"`
	ID          int          `gorm:"primaryKey" json:"id"`
	WowAccounts []WowAccount `json:"wow_accounts"  gorm:"foreignKey:UserProfileID"`
}

type Links struct {
	Self    Link `json:"self" gorm:"foreignKey:UserProfileID"`
	User    Link `json:"user"`
	Profile Link `json:"profile"`
}

type Link struct {
	Href string `json:"href"`
}

type WowAccount struct {
	ID            int         `gorm:"primaryKey" json:"id"`
	UserProfileID uint        `json:"user_profile_id"` // Foreign key for UserProfile
	Characters    []Character `json:"characters" gorm:"foreignKey:WowAccountID"`
}

type Character struct {
	Character          Link     `json:"character"`
	ProtectedCharacter Link     `json:"protected_character"`
	Name               string   `json:"name"`
	ID                 int      `gorm:"primaryKey" json:"id"`
	Realm              Realm    `json:"realm"`
	PlayableClass      Playable `json:"playable_class"`
	PlayableRace       Playable `json:"playable_race"`
	Gender             Gender   `json:"gender"`
	Faction            Faction  `json:"faction"`
	Level              int      `json:"level"`
}

type Realm struct {
	Key  Link              `json:"key"`
	Name map[string]string `json:"name"`
	ID   int               `gorm:"primaryKey" json:"id"`
	Slug string            `json:"slug"`
}

type Playable struct {
	Key  Link              `json:"key"`
	Name map[string]string `json:"name"`
	ID   int               `gorm:"primaryKey" json:"id"`
}

type Gender struct {
	ID   int               `gorm:"primaryKey" json:"id"`
	Type string            `json:"type"`
	Name map[string]string `json:"name"`
}

type Faction struct {
	ID   int               `gorm:"primaryKey" json:"id"`
	Type string            `json:"type"`
	Name map[string]string `json:"name"`
}
