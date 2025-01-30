package models

import "time"

type GuildProgModel struct {
	Name            string    `json:"name"`
	Faction         string    `json:"faction"`
	Region          string    `json:"region"`
	Realm           string    `json:"realm"`
	LastCrawledAt   time.Time `json:"last_crawled_at"`
	ProfileURL      string    `json:"profile_url"`
	RaidProgression struct {
		NeruBarPalace struct {
			Summary            string `json:"summary"`
			TotalBosses        int    `json:"total_bosses"`
			NormalBossesKilled int    `json:"normal_bosses_killed"`
			HeroicBossesKilled int    `json:"heroic_bosses_killed"`
			MythicBossesKilled int    `json:"mythic_bosses_killed"`
		} `json:"nerubar-palace"`
	} `json:"raid_progression"`
}

type GuildMembers struct {
	Name          string    `json:"name"`
	Faction       string    `json:"faction"`
	Region        string    `json:"region"`
	Realm         string    `json:"realm"`
	LastCrawledAt time.Time `json:"last_crawled_at"`
	ProfileURL    string    `json:"profile_url"`
	Members       []struct {
		Rank      int `json:"rank"`
		Character struct {
			Name              string    `json:"name"`
			Race              string    `json:"race"`
			Class             string    `json:"class"`
			ActiveSpecName    string    `json:"active_spec_name"`
			ActiveSpecRole    string    `json:"active_spec_role"`
			Gender            string    `json:"gender"`
			Faction           string    `json:"faction"`
			AchievementPoints int       `json:"achievement_points"`
			HonorableKills    int       `json:"honorable_kills"`
			Region            string    `json:"region"`
			Realm             string    `json:"realm"`
			LastCrawledAt     time.Time `json:"last_crawled_at"`
			ProfileURL        string    `json:"profile_url"`
			ProfileBanner     string    `json:"profile_banner"`
		} `json:"character"`
	} `json:"members"`
}

type GuildRank struct {
	Name          string    `json:"name"`
	Faction       string    `json:"faction"`
	Region        string    `json:"region"`
	Realm         string    `json:"realm"`
	LastCrawledAt time.Time `json:"last_crawled_at"`
	ProfileURL    string    `json:"profile_url"`
	RaidRankings  struct {
		NeruBarPalace struct {
			Normal struct {
				World  int `json:"world"`
				Region int `json:"region"`
				Realm  int `json:"realm"`
			} `json:"normal"`
			Heroic struct {
				World  int `json:"world"`
				Region int `json:"region"`
				Realm  int `json:"realm"`
			} `json:"heroic"`
			Mythic struct {
				World  int `json:"world"`
				Region int `json:"region"`
				Realm  int `json:"realm"`
			} `json:"mythic"`
		} `json:"nerubar-palace"`
	} `json:"raid_rankings"`
}

// must be current tier, no season 4 listing
type ExtractedGuildProg struct {
	GuildName   string `json:"name"`
	RaidName    string
	Summary     string `json:"summary"`
	TotalBosses int64  `json:"total_bosses"`
	NormalKills int64  `json:"normal_bosses_killed"`
	HeroicKills int64  `json:"heroic_bosses_killed"`
	MythicKills int64  `json:"mythic_bosses_killed"`
}

type StaticRaidModel struct {
	Raids []struct {
		ID        int    `json:"id"`
		Slug      string `json:"slug"`
		Name      string `json:"name"`
		ShortName string `json:"short_name"`
		Icon      string `json:"icon"`
		Starts    struct {
			Us time.Time `json:"us"`
			Eu time.Time `json:"eu"`
			Tw time.Time `json:"tw"`
			Kr time.Time `json:"kr"`
			Cn time.Time `json:"cn"`
		} `json:"starts"`
		Ends struct {
			Us time.Time `json:"us"`
			Eu time.Time `json:"eu"`
			Tw time.Time `json:"tw"`
			Kr time.Time `json:"kr"`
			Cn time.Time `json:"cn"`
		} `json:"ends"`
		Encounters []struct {
			ID   int    `json:"id"`
			Slug string `json:"slug"`
			Name string `json:"name"`
		} `json:"encounters"`
	} `json:"raids"`
}

type BossKillModel struct {
	Name           string    `json:"name"`
	Faction        string    `json:"faction"`
	Region         string    `json:"region"`
	Realm          string    `json:"realm"`
	LastCrawledAt  time.Time `json:"last_crawled_at"`
	ProfileURL     string    `json:"profile_url"`
	RaidEncounters []struct {
		Slug       string    `json:"slug"`
		Name       string    `json:"name"`
		DefeatedAt time.Time `json:"defeatedAt"`
	} `json:"raid_encounters"`
}

type DetailedBossKillModel struct {
	Kill struct {
		PulledAt             time.Time `json:"pulledAt"`
		DefeatedAt           time.Time `json:"defeatedAt"`
		DurationMs           int       `json:"durationMs"`
		IsSuccess            bool      `json:"isSuccess"`
		ItemLevelEquippedAvg float64   `json:"itemLevelEquippedAvg"`
		ItemLevelEquippedMax float64   `json:"itemLevelEquippedMax"`
		ItemLevelEquippedMin float64   `json:"itemLevelEquippedMin"`
	} `json:"kill"`
	Roster []struct {
		Character struct {
			ID   int    `json:"id"`
			Name string `json:"name"`
			Race struct {
				ID      int    `json:"id"`
				Name    string `json:"name"`
				Slug    string `json:"slug"`
				Faction string `json:"faction"`
			} `json:"race"`
			Class struct {
				ID   int    `json:"id"`
				Name string `json:"name"`
				Slug string `json:"slug"`
			} `json:"class"`
			Spec struct {
				ID      int    `json:"id"`
				Name    string `json:"name"`
				Slug    string `json:"slug"`
				ClassID int    `json:"class_id"`
				Role    string `json:"role"`
				IsMelee bool   `json:"is_melee"`
				Patch   string `json:"patch"`
				Ordinal int    `json:"ordinal"`
			} `json:"spec"`
			TalentLoadout struct {
				SpecID        int `json:"specId"`
				HeroSubTreeID int `json:"heroSubTreeId"`
				Loadout       []struct {
					Node struct {
						ID        int `json:"id"`
						TreeID    int `json:"treeId"`
						SubTreeID int `json:"subTreeId"`
						Type      int `json:"type"`
						Entries   []struct {
							ID                int `json:"id"`
							TraitDefinitionID int `json:"traitDefinitionId"`
							TraitSubTreeID    int `json:"traitSubTreeId"`
							Type              int `json:"type"`
							MaxRanks          int `json:"maxRanks"`
							Spell             struct {
								ID          int         `json:"id"`
								Name        string      `json:"name"`
								Icon        string      `json:"icon"`
								School      int         `json:"school"`
								Rank        interface{} `json:"rank"`
								HasCooldown bool        `json:"hasCooldown"`
							} `json:"spell"`
						} `json:"entries"`
						Important bool `json:"important"`
						PosX      int  `json:"posX"`
						PosY      int  `json:"posY"`
						Row       int  `json:"row"`
						Col       int  `json:"col"`
					} `json:"node"`
					EntryIndex int `json:"entryIndex"`
					Rank       int `json:"rank"`
				} `json:"loadout"`
				LoadoutText string `json:"loadoutText"`
			} `json:"talentLoadout"`
			Gender            string  `json:"gender"`
			Thumbnail         string  `json:"thumbnail"`
			ItemLevelEquipped float64 `json:"itemLevelEquipped"`
			ArtifactTraits    int     `json:"artifactTraits"`
			Realm             struct {
				ID                  int         `json:"id"`
				ConnectedRealmID    int         `json:"connectedRealmId"`
				WowRealmID          int         `json:"wowRealmId"`
				WowConnectedRealmID int         `json:"wowConnectedRealmId"`
				Name                string      `json:"name"`
				AltName             interface{} `json:"altName"`
				Slug                string      `json:"slug"`
				AltSlug             string      `json:"altSlug"`
				Locale              string      `json:"locale"`
				IsConnected         bool        `json:"isConnected"`
				RealmType           string      `json:"realmType"`
			} `json:"realm"`
			Region struct {
				Name      string `json:"name"`
				Slug      string `json:"slug"`
				ShortName string `json:"short_name"`
			} `json:"region"`
			Items struct {
				CreatedAt         time.Time `json:"created_at"`
				UpdatedAt         time.Time `json:"updated_at"`
				ItemLevelEquipped float64   `json:"item_level_equipped"`
				ItemLevelTotal    int       `json:"item_level_total"`
				ArtifactTraits    int       `json:"artifact_traits"`
				Corruption        struct {
					Added     int           `json:"added"`
					Resisted  int           `json:"resisted"`
					Total     int           `json:"total"`
					CloakRank int           `json:"cloakRank"`
					Spells    []interface{} `json:"spells"`
				} `json:"corruption"`
				Items struct {
					Head struct {
						ItemID         int           `json:"item_id"`
						ItemLevel      int           `json:"item_level"`
						Icon           string        `json:"icon"`
						Name           string        `json:"name"`
						ItemQuality    int           `json:"item_quality"`
						IsLegendary    bool          `json:"is_legendary"`
						IsAzeriteArmor bool          `json:"is_azerite_armor"`
						AzeritePowers  []interface{} `json:"azerite_powers"`
						Corruption     struct {
							Added    int `json:"added"`
							Resisted int `json:"resisted"`
							Total    int `json:"total"`
						} `json:"corruption"`
						DominationShards []interface{} `json:"domination_shards"`
						Tier             string        `json:"tier"`
						Gems             []interface{} `json:"gems"`
						Enchants         []interface{} `json:"enchants"`
						Bonuses          []int         `json:"bonuses"`
					} `json:"head"`
					Neck struct {
						ItemID         int           `json:"item_id"`
						ItemLevel      int           `json:"item_level"`
						Icon           string        `json:"icon"`
						Name           string        `json:"name"`
						ItemQuality    int           `json:"item_quality"`
						IsLegendary    bool          `json:"is_legendary"`
						IsAzeriteArmor bool          `json:"is_azerite_armor"`
						AzeritePowers  []interface{} `json:"azerite_powers"`
						Corruption     struct {
							Added    int `json:"added"`
							Resisted int `json:"resisted"`
							Total    int `json:"total"`
						} `json:"corruption"`
						DominationShards []interface{} `json:"domination_shards"`
						Gems             []int         `json:"gems"`
						Enchants         []interface{} `json:"enchants"`
						Bonuses          []int         `json:"bonuses"`
					} `json:"neck"`
					Shoulder struct {
						ItemID         int           `json:"item_id"`
						ItemLevel      int           `json:"item_level"`
						Icon           string        `json:"icon"`
						Name           string        `json:"name"`
						ItemQuality    int           `json:"item_quality"`
						IsLegendary    bool          `json:"is_legendary"`
						IsAzeriteArmor bool          `json:"is_azerite_armor"`
						AzeritePowers  []interface{} `json:"azerite_powers"`
						Corruption     struct {
							Added    int `json:"added"`
							Resisted int `json:"resisted"`
							Total    int `json:"total"`
						} `json:"corruption"`
						DominationShards []interface{} `json:"domination_shards"`
						Tier             string        `json:"tier"`
						Gems             []interface{} `json:"gems"`
						Enchants         []interface{} `json:"enchants"`
						Bonuses          []int         `json:"bonuses"`
					} `json:"shoulder"`
					Back struct {
						ItemID         int           `json:"item_id"`
						ItemLevel      int           `json:"item_level"`
						Enchant        int           `json:"enchant"`
						Icon           string        `json:"icon"`
						Name           string        `json:"name"`
						ItemQuality    int           `json:"item_quality"`
						IsLegendary    bool          `json:"is_legendary"`
						IsAzeriteArmor bool          `json:"is_azerite_armor"`
						AzeritePowers  []interface{} `json:"azerite_powers"`
						Corruption     struct {
							Added    int `json:"added"`
							Resisted int `json:"resisted"`
							Total    int `json:"total"`
						} `json:"corruption"`
						DominationShards []interface{} `json:"domination_shards"`
						Gems             []interface{} `json:"gems"`
						Enchants         []int         `json:"enchants"`
						Bonuses          []int         `json:"bonuses"`
					} `json:"back"`
					Chest struct {
						ItemID         int           `json:"item_id"`
						ItemLevel      int           `json:"item_level"`
						Enchant        int           `json:"enchant"`
						Icon           string        `json:"icon"`
						Name           string        `json:"name"`
						ItemQuality    int           `json:"item_quality"`
						IsLegendary    bool          `json:"is_legendary"`
						IsAzeriteArmor bool          `json:"is_azerite_armor"`
						AzeritePowers  []interface{} `json:"azerite_powers"`
						Corruption     struct {
							Added    int `json:"added"`
							Resisted int `json:"resisted"`
							Total    int `json:"total"`
						} `json:"corruption"`
						DominationShards []interface{} `json:"domination_shards"`
						Tier             string        `json:"tier"`
						Gems             []interface{} `json:"gems"`
						Enchants         []int         `json:"enchants"`
						Bonuses          []int         `json:"bonuses"`
					} `json:"chest"`
					Waist struct {
						ItemID         int           `json:"item_id"`
						ItemLevel      int           `json:"item_level"`
						Icon           string        `json:"icon"`
						Name           string        `json:"name"`
						ItemQuality    int           `json:"item_quality"`
						IsLegendary    bool          `json:"is_legendary"`
						IsAzeriteArmor bool          `json:"is_azerite_armor"`
						AzeritePowers  []interface{} `json:"azerite_powers"`
						Corruption     struct {
							Added    int `json:"added"`
							Resisted int `json:"resisted"`
							Total    int `json:"total"`
						} `json:"corruption"`
						DominationShards []interface{} `json:"domination_shards"`
						Gems             []interface{} `json:"gems"`
						Enchants         []interface{} `json:"enchants"`
						Bonuses          []int         `json:"bonuses"`
					} `json:"waist"`
					Wrist struct {
						ItemID         int           `json:"item_id"`
						ItemLevel      int           `json:"item_level"`
						Enchant        int           `json:"enchant"`
						Icon           string        `json:"icon"`
						Name           string        `json:"name"`
						ItemQuality    int           `json:"item_quality"`
						IsLegendary    bool          `json:"is_legendary"`
						IsAzeriteArmor bool          `json:"is_azerite_armor"`
						AzeritePowers  []interface{} `json:"azerite_powers"`
						Corruption     struct {
							Added    int `json:"added"`
							Resisted int `json:"resisted"`
							Total    int `json:"total"`
						} `json:"corruption"`
						DominationShards []interface{} `json:"domination_shards"`
						Gems             []int         `json:"gems"`
						Enchants         []int         `json:"enchants"`
						Bonuses          []int         `json:"bonuses"`
					} `json:"wrist"`
					Hands struct {
						ItemID         int           `json:"item_id"`
						ItemLevel      int           `json:"item_level"`
						Icon           string        `json:"icon"`
						Name           string        `json:"name"`
						ItemQuality    int           `json:"item_quality"`
						IsLegendary    bool          `json:"is_legendary"`
						IsAzeriteArmor bool          `json:"is_azerite_armor"`
						AzeritePowers  []interface{} `json:"azerite_powers"`
						Corruption     struct {
							Added    int `json:"added"`
							Resisted int `json:"resisted"`
							Total    int `json:"total"`
						} `json:"corruption"`
						DominationShards []interface{} `json:"domination_shards"`
						Tier             string        `json:"tier"`
						Gems             []interface{} `json:"gems"`
						Enchants         []interface{} `json:"enchants"`
						Bonuses          []int         `json:"bonuses"`
					} `json:"hands"`
					Legs struct {
						ItemID         int           `json:"item_id"`
						ItemLevel      int           `json:"item_level"`
						Enchant        int           `json:"enchant"`
						Icon           string        `json:"icon"`
						Name           string        `json:"name"`
						ItemQuality    int           `json:"item_quality"`
						IsLegendary    bool          `json:"is_legendary"`
						IsAzeriteArmor bool          `json:"is_azerite_armor"`
						AzeritePowers  []interface{} `json:"azerite_powers"`
						Corruption     struct {
							Added    int `json:"added"`
							Resisted int `json:"resisted"`
							Total    int `json:"total"`
						} `json:"corruption"`
						DominationShards []interface{} `json:"domination_shards"`
						Gems             []interface{} `json:"gems"`
						Enchants         []int         `json:"enchants"`
						Bonuses          []int         `json:"bonuses"`
					} `json:"legs"`
					Feet struct {
						ItemID         int           `json:"item_id"`
						ItemLevel      int           `json:"item_level"`
						Enchant        int           `json:"enchant"`
						Icon           string        `json:"icon"`
						Name           string        `json:"name"`
						ItemQuality    int           `json:"item_quality"`
						IsLegendary    bool          `json:"is_legendary"`
						IsAzeriteArmor bool          `json:"is_azerite_armor"`
						AzeritePowers  []interface{} `json:"azerite_powers"`
						Corruption     struct {
							Added    int `json:"added"`
							Resisted int `json:"resisted"`
							Total    int `json:"total"`
						} `json:"corruption"`
						DominationShards []interface{} `json:"domination_shards"`
						Gems             []interface{} `json:"gems"`
						Enchants         []int         `json:"enchants"`
						Bonuses          []int         `json:"bonuses"`
					} `json:"feet"`
					Finger1 struct {
						ItemID         int           `json:"item_id"`
						ItemLevel      int           `json:"item_level"`
						Enchant        int           `json:"enchant"`
						Icon           string        `json:"icon"`
						Name           string        `json:"name"`
						ItemQuality    int           `json:"item_quality"`
						IsLegendary    bool          `json:"is_legendary"`
						IsAzeriteArmor bool          `json:"is_azerite_armor"`
						AzeritePowers  []interface{} `json:"azerite_powers"`
						Corruption     struct {
							Added    int `json:"added"`
							Resisted int `json:"resisted"`
							Total    int `json:"total"`
						} `json:"corruption"`
						DominationShards []interface{} `json:"domination_shards"`
						Gems             []int         `json:"gems"`
						Enchants         []int         `json:"enchants"`
						Bonuses          []int         `json:"bonuses"`
					} `json:"finger1"`
					Finger2 struct {
						ItemID         int           `json:"item_id"`
						ItemLevel      int           `json:"item_level"`
						Enchant        int           `json:"enchant"`
						Icon           string        `json:"icon"`
						Name           string        `json:"name"`
						ItemQuality    int           `json:"item_quality"`
						IsLegendary    bool          `json:"is_legendary"`
						IsAzeriteArmor bool          `json:"is_azerite_armor"`
						AzeritePowers  []interface{} `json:"azerite_powers"`
						Corruption     struct {
							Added    int `json:"added"`
							Resisted int `json:"resisted"`
							Total    int `json:"total"`
						} `json:"corruption"`
						DominationShards []interface{} `json:"domination_shards"`
						Gems             []int         `json:"gems"`
						Enchants         []int         `json:"enchants"`
						Bonuses          []int         `json:"bonuses"`
					} `json:"finger2"`
					Trinket1 struct {
						ItemID         int           `json:"item_id"`
						ItemLevel      int           `json:"item_level"`
						Icon           string        `json:"icon"`
						Name           string        `json:"name"`
						ItemQuality    int           `json:"item_quality"`
						IsLegendary    bool          `json:"is_legendary"`
						IsAzeriteArmor bool          `json:"is_azerite_armor"`
						AzeritePowers  []interface{} `json:"azerite_powers"`
						Corruption     struct {
							Added    int `json:"added"`
							Resisted int `json:"resisted"`
							Total    int `json:"total"`
						} `json:"corruption"`
						DominationShards []interface{} `json:"domination_shards"`
						Gems             []interface{} `json:"gems"`
						Enchants         []interface{} `json:"enchants"`
						Bonuses          []int         `json:"bonuses"`
					} `json:"trinket1"`
					Trinket2 struct {
						ItemID         int           `json:"item_id"`
						ItemLevel      int           `json:"item_level"`
						Icon           string        `json:"icon"`
						Name           string        `json:"name"`
						ItemQuality    int           `json:"item_quality"`
						IsLegendary    bool          `json:"is_legendary"`
						IsAzeriteArmor bool          `json:"is_azerite_armor"`
						AzeritePowers  []interface{} `json:"azerite_powers"`
						Corruption     struct {
							Added    int `json:"added"`
							Resisted int `json:"resisted"`
							Total    int `json:"total"`
						} `json:"corruption"`
						DominationShards []interface{} `json:"domination_shards"`
						Gems             []interface{} `json:"gems"`
						Enchants         []interface{} `json:"enchants"`
						Bonuses          []int         `json:"bonuses"`
					} `json:"trinket2"`
					Mainhand struct {
						ItemID         int           `json:"item_id"`
						ItemLevel      int           `json:"item_level"`
						Enchant        int           `json:"enchant"`
						Icon           string        `json:"icon"`
						Name           string        `json:"name"`
						ItemQuality    int           `json:"item_quality"`
						IsLegendary    bool          `json:"is_legendary"`
						IsAzeriteArmor bool          `json:"is_azerite_armor"`
						AzeritePowers  []interface{} `json:"azerite_powers"`
						Corruption     struct {
							Added    int `json:"added"`
							Resisted int `json:"resisted"`
							Total    int `json:"total"`
						} `json:"corruption"`
						DominationShards []interface{} `json:"domination_shards"`
						Gems             []interface{} `json:"gems"`
						Enchants         []int         `json:"enchants"`
						Bonuses          []int         `json:"bonuses"`
					} `json:"mainhand"`
				} `json:"items"`
			} `json:"items"`
			RecruitmentProfiles []interface{} `json:"recruitmentProfiles"`
		} `json:"character"`
	} `json:"roster"`
}

type CharacterPresentInfo struct {
	Name              string  `json:"name"`
	RaceName          string  `json:"raceName"`
	RaceFaction       string  `json:"raceFaction"`
	ClassName         string  `json:"className"`
	SpecName          string  `json:"specName"`
	SpecRole          string  `json:"specRole"`
	SpecIsMelee       bool    `json:"specIsMelee"`
	ItemLevelEquipped float64 `json:"itemLevelEquipped"`
	RealmName         string  `json:"realmName"`
	RealmSlug         string  `json:"realmSlug"`
	RegionSlug        string  `json:"regionSlug"`
}
