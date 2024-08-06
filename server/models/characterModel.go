package models

type CharacterStatModel struct {
	Links struct {
		Self struct {
			Href string `json:"href"`
		} `json:"self"`
	} `json:"_links"`
	Health    int `json:"health"`
	Power     int `json:"power"`
	PowerType struct {
		Key struct {
			Href string `json:"href"`
		} `json:"key"`
		Name string `json:"name"`
		ID   int    `json:"id"`
	} `json:"power_type"`
	Speed struct {
		Rating      int     `json:"rating"`
		RatingBonus float64 `json:"rating_bonus"`
	} `json:"speed"`
	Strength struct {
		Base      int `json:"base"`
		Effective int `json:"effective"`
	} `json:"strength"`
	Agility struct {
		Base      int `json:"base"`
		Effective int `json:"effective"`
	} `json:"agility"`
	Intellect struct {
		Base      int `json:"base"`
		Effective int `json:"effective"`
	} `json:"intellect"`
	Stamina struct {
		Base      int `json:"base"`
		Effective int `json:"effective"`
	} `json:"stamina"`
	MeleeCrit struct {
		Rating      int     `json:"rating"`
		RatingBonus float64 `json:"rating_bonus"`
		Value       float64 `json:"value"`
	} `json:"melee_crit"`
	MeleeHaste struct {
		Rating      int     `json:"rating"`
		RatingBonus float64 `json:"rating_bonus"`
		Value       float64 `json:"value"`
	} `json:"melee_haste"`
	Mastery struct {
		Rating      int     `json:"rating"`
		RatingBonus float64 `json:"rating_bonus"`
		Value       float64 `json:"value"`
	} `json:"mastery"`
	BonusArmor int `json:"bonus_armor"`
	Lifesteal  struct {
		Rating      int     `json:"rating"`
		RatingBonus float64 `json:"rating_bonus"`
		Value       float64 `json:"value"`
	} `json:"lifesteal"`
	Versatility                 float64 `json:"versatility"`
	VersatilityDamageDoneBonus  float64 `json:"versatility_damage_done_bonus"`
	VersatilityHealingDoneBonus float64 `json:"versatility_healing_done_bonus"`
	VersatilityDamageTakenBonus float64 `json:"versatility_damage_taken_bonus"`
	Avoidance                   struct {
		Rating      int     `json:"rating"`
		RatingBonus float64 `json:"rating_bonus"`
	} `json:"avoidance"`
	AttackPower       int     `json:"attack_power"`
	MainHandDamageMin float64 `json:"main_hand_damage_min"`
	MainHandDamageMax float64 `json:"main_hand_damage_max"`
	MainHandSpeed     float64 `json:"main_hand_speed"`
	MainHandDps       float64 `json:"main_hand_dps"`
	OffHandDamageMin  float64 `json:"off_hand_damage_min"`
	OffHandDamageMax  float64 `json:"off_hand_damage_max"`
	OffHandSpeed      float64 `json:"off_hand_speed"`
	OffHandDps        float64 `json:"off_hand_dps"`
	SpellPower        int     `json:"spell_power"`
	SpellPenetration  float64 `json:"spell_penetration"`
	SpellCrit         struct {
		Rating      int     `json:"rating"`
		RatingBonus float64 `json:"rating_bonus"`
		Value       float64 `json:"value"`
	} `json:"spell_crit"`
	ManaRegen       float64 `json:"mana_regen"`
	ManaRegenCombat float64 `json:"mana_regen_combat"`
	Armor           struct {
		Base      int `json:"base"`
		Effective int `json:"effective"`
	} `json:"armor"`
	Dodge struct {
		Rating      int     `json:"rating"`
		RatingBonus float64 `json:"rating_bonus"`
		Value       float64 `json:"value"`
	} `json:"dodge"`
	Parry struct {
		Rating      int     `json:"rating"`
		RatingBonus float64 `json:"rating_bonus"`
		Value       float64 `json:"value"`
	} `json:"parry"`
	Block struct {
		Rating      int     `json:"rating"`
		RatingBonus float64 `json:"rating_bonus"`
		Value       float64 `json:"value"`
	} `json:"block"`
	RangedCrit struct {
		Rating      int     `json:"rating"`
		RatingBonus float64 `json:"rating_bonus"`
		Value       float64 `json:"value"`
	} `json:"ranged_crit"`
	RangedHaste struct {
		Rating      int     `json:"rating"`
		RatingBonus float64 `json:"rating_bonus"`
		Value       float64 `json:"value"`
	} `json:"ranged_haste"`
	SpellHaste struct {
		Rating      int     `json:"rating"`
		RatingBonus float64 `json:"rating_bonus"`
		Value       float64 `json:"value"`
	} `json:"spell_haste"`
	Character struct {
		Key struct {
			Href string `json:"href"`
		} `json:"key"`
		Name  string `json:"name"`
		ID    int    `json:"id"`
		Realm struct {
			Key struct {
				Href string `json:"href"`
			} `json:"key"`
			Name string `json:"name"`
			ID   int    `json:"id"`
			Slug string `json:"slug"`
		} `json:"realm"`
	} `json:"character"`
}

type ExtractedCharacterStat struct {
	Health      int     `json:"health"`
	Power       int     `json:"power"`
	Speed       int     `json:"speed"`
	Strength    int     `json:"strength"`
	Agility     int     `json:"agility"`
	Intellect   int     `json:"intellect"`
	Stamina     int     `json:"stamina"`
	MeleeCrit   float64 `json:"melee_crit"`
	MeleeHaste  float64 `json:"melee_haste"`
	Mastery     float64 `json:"mastery"`
	BonusArmor  int     `json:"bonus_armor"`
	Lifesteal   float64 `json:"lifesteal"`
	Versatility float64 `json:"versatility"`
	AttackPower int     `json:"attack_power"`
	SpellPower  int     `json:"spell_power"`
	SpellCrit   float64 `json:"spell_crit"`
	RangedCrit  float64 `json:"ranged_crit"`
	RangedHaste float64 `json:"ranged_haste"`
	SpellHaste  float64 `json:"spell_haste"`
	Character   string  `json:"character"`
}

type Item struct {
	ItemID           int            `json:"item_id"`
	ItemLevel        int            `json:"item_level"`
	Enchant          int            `json:"enchant"`
	Icon             string         `json:"icon"`
	Name             string         `json:"name"`
	ItemQuality      int            `json:"item_quality"`
	IsLegendary      bool           `json:"is_legendary"`
	IsAzeriteArmor   bool           `json:"is_azerite_armor"`
	AzeritePowers    []AzeritePower `json:"azerite_powers"`
	Corruption       Corruption     `json:"corruption"`
	DominationShards []interface{}  `json:"domination_shards"`
	Tier             string         `json:"tier"`
	Gems             []int          `json:"gems"`
	Bonuses          []int          `json:"bonuses"`
}

type AzeritePower struct {
	ID    int   `json:"id"`
	Spell Spell `json:"spell"`
	Tier  int   `json:"tier"`
}

type Spell struct {
	ID     int    `json:"id"`
	School int    `json:"school"`
	Icon   string `json:"icon"`
	Name   string `json:"name"`
	Rank   *int   `json:"rank"`
}

type Corruption struct {
	Added     int `json:"added"`
	Resisted  int `json:"resisted"`
	Total     int `json:"total"`
	CloakRank int `json:"cloakRank"`
}

type Gear struct {
	UpdatedAt         string     `json:"updated_at"`
	ItemLevelEquipped int        `json:"item_level_equipped"`
	ItemLevelTotal    int        `json:"item_level_total"`
	ArtifactTraits    int        `json:"artifact_traits"`
	Corruption        Corruption `json:"corruption"`
	Items             struct {
		Head     Item `json:"head"`
		Neck     Item `json:"neck"`
		Shoulder Item `json:"shoulder"`
		Back     Item `json:"back"`
		Chest    Item `json:"chest"`
		Waist    Item `json:"waist"`
		Shirt    Item `json:"shirt"`
		Wrist    Item `json:"wrist"`
		Hands    Item `json:"hands"`
		Legs     Item `json:"legs"`
		Feet     Item `json:"feet"`
		Finger1  Item `json:"finger1"`
		Finger2  Item `json:"finger2"`
		Trinket1 Item `json:"trinket1"`
		Trinket2 Item `json:"trinket2"`
		Mainhand Item `json:"mainhand"`
		Offhand  Item `json:"offhand"`
	} `json:"items"`
}
