package models

type Link struct {
	Href string `json:"href" gorm:"type:text"`
}

type Links struct {
	ID      uint `gorm:"primaryKey"`
	Self    Link `json:"self" gorm:"embedded;embeddedPrefix:self_"`
	User    Link `json:"user" gorm:"embedded;embeddedPrefix:user_"`
	Profile Link `json:"profile" gorm:"embedded;embeddedPrefix:profile_"`
}

type Realm struct {
	Key  Link   `json:"key" gorm:"embedded;embeddedPrefix:key_"`
	Name string `json:"name" gorm:"type:text"`
	ID   uint   `json:"id"`
	Slug string `json:"slug" gorm:"type:text"`
}

type PlayableClass struct {
	Key  Link   `json:"key" gorm:"embedded;embeddedPrefix:key_"`
	Name string `json:"name" gorm:"type:text"`
	ID   uint   `json:"id"`
}

type PlayableRace struct {
	Key  Link   `json:"key" gorm:"embedded;embeddedPrefix:key_"`
	Name string `json:"name" gorm:"type:text"`
	ID   uint   `json:"id"`
}

type Gender struct {
	Type string `json:"type" gorm:"type:text"`
	Name string `json:"name" gorm:"type:text"`
}

type Faction struct {
	Type string `json:"type" gorm:"type:text"`
	Name string `json:"name" gorm:"type:text"`
}

type Character struct {
	ID            uint          `json:"id" gorm:"primaryKey"`
	Name          string        `json:"name" gorm:"type:text"`
	Href          Link          `json:"href" gorm:"embedded;embeddedPrefix:href_"`
	ProtectedHref Link          `json:"protected_href" gorm:"embedded;embeddedPrefix:protected_href_"`
	Realm         Realm         `json:"realm" gorm:"embedded;embeddedPrefix:realm_"`
	PlayableClass PlayableClass `json:"playable_class" gorm:"embedded;embeddedPrefix:playable_class_"`
	PlayableRace  PlayableRace  `json:"playable_race" gorm:"embedded;embeddedPrefix:playable_race_"`
	Gender        Gender        `json:"gender" gorm:"embedded;embeddedPrefix:gender_"`
	Faction       Faction       `json:"faction" gorm:"embedded;embeddedPrefix:faction_"`
	Level         int           `json:"level"`
	WowAccountID  uint          `gorm:"index"`
}

type WowAccount struct {
	ID         uint        `json:"id" gorm:"primaryKey"`
	Characters []Character `json:"characters" gorm:"foreignKey:WowAccountID"`
	UserID     uint        `gorm:"index"`
}

type User struct {
	ID          uint         `json:"id" gorm:"primaryKey"`
	Links       Links        `json:"_links" gorm:"embedded"`
	WowAccounts []WowAccount `json:"wow_accounts" gorm:"foreignKey:UserID"`
	Collections Link         `json:"collections" gorm:"embedded;embeddedPrefix:collections_"`
}
