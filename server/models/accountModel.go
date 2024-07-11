package models

type Link struct {
	Href string `json:"href" gorm:"type:text"`
}

type Links struct {
	Self    Link `json:"self" gorm:"embedded;embeddedPrefix:self_"`
	User    Link `json:"user" gorm:"embedded;embeddedPrefix:user_"`
	Profile Link `json:"profile" gorm:"embedded;embeddedPrefix:profile_"`
}

type Realm struct {
	ID   uint              `json:"id"`
	Slug string            `json:"slug" gorm:"type:text"`
	Name map[string]string `json:"names,omitempty" gorm:"-"`
}

type PlayableClass struct {
	ID   uint              `json:"id"`
	Name map[string]string `json:"names,omitempty" gorm:"-"`
}

type PlayableRace struct {
	Key  Link              `json:"key" gorm:"embedded;embeddedPrefix:key_"`
	Name map[string]string `json:"name" gorm:"-"`
	ID   uint              `json:"id"`
}

type Gender struct {
	Type string            `json:"type" gorm:"type:text"`
	Name map[string]string `json:"name" gorm:"-"`
}

type Faction struct {
	Type string            `json:"type" gorm:"type:text"`
	Name map[string]string `json:"name" gorm:"-"`
}

type Character struct {
	ID              uint          `json:"id" gorm:"primaryKey"`
	Name            string        `json:"name" gorm:"type:text"`
	CharacterHref   Link          `json:"character" gorm:"embedded;embeddedPrefix:character_"`
	ProtectedHref   Link          `json:"protected_character" gorm:"embedded;embeddedPrefix:protected_character_"`
	RealmID         uint          `json:"-" gorm:"index"` // Foreign key column
	Realm           Realm         `json:"realm" gorm:"embedded;embeddedPrefix:realm_"`
	PlayableClassID uint          `json:"-" gorm:"index"` // Foreign key column
	PlayableClass   PlayableClass `json:"playable_class" gorm:"embedded;embeddedPrefix:playable_class_"`
	PlayableRaceID  uint          `json:"-" gorm:"index"` // Foreign key column
	PlayableRace    PlayableRace  `json:"playable_race" gorm:"embedded;embeddedPrefix:playable_race_"`
	GenderID        uint          `json:"-" gorm:"index"` // Foreign key column
	Gender          Gender        `json:"gender" gorm:"embedded;embeddedPrefix:gender_"`
	FactionID       uint          `json:"-" gorm:"index"` // Foreign key column
	Faction         Faction       `json:"faction" gorm:"embedded;embeddedPrefix:faction_"`
	Level           int           `json:"level"`
	WowAccountID    uint          `gorm:"index"`
}

type WowAccount struct {
	ID         uint        `json:"id" gorm:"primaryKey"`
	UserID     uint        `json:"-" gorm:"index"` // Foreign key column
	Characters []Character `json:"characters" gorm:"foreignKey:WowAccountID"`
}

type User struct {
	ID          uint         `json:"id" gorm:"primaryKey"`
	Links       Links        `json:"_links" gorm:"embedded"`
	WowAccounts []WowAccount `json:"wow_accounts" gorm:"foreignKey:UserID"`
	Collections Link         `json:"collections" gorm:"embedded;embeddedPrefix:collections_"`
}
