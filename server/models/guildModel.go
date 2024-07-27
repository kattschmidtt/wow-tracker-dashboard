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
		AberrusTheShadowedCrucible struct {
			Summary            string `json:"summary"`
			TotalBosses        int    `json:"total_bosses"`
			NormalBossesKilled int    `json:"normal_bosses_killed"`
			HeroicBossesKilled int    `json:"heroic_bosses_killed"`
			MythicBossesKilled int    `json:"mythic_bosses_killed"`
		} `json:"aberrus-the-shadowed-crucible"`
		AmirdrassilTheDreamsHope struct {
			Summary            string `json:"summary"`
			TotalBosses        int    `json:"total_bosses"`
			NormalBossesKilled int    `json:"normal_bosses_killed"`
			HeroicBossesKilled int    `json:"heroic_bosses_killed"`
			MythicBossesKilled int    `json:"mythic_bosses_killed"`
		} `json:"amirdrassil-the-dreams-hope"`
		AwakenedAberrusTheShadowedCrucible struct {
			Summary            string `json:"summary"`
			TotalBosses        int    `json:"total_bosses"`
			NormalBossesKilled int    `json:"normal_bosses_killed"`
			HeroicBossesKilled int    `json:"heroic_bosses_killed"`
			MythicBossesKilled int    `json:"mythic_bosses_killed"`
		} `json:"awakened-aberrus-the-shadowed-crucible"`
		AwakenedAmirdrassilTheDreamsHope struct {
			Summary            string `json:"summary"`
			TotalBosses        int    `json:"total_bosses"`
			NormalBossesKilled int    `json:"normal_bosses_killed"`
			HeroicBossesKilled int    `json:"heroic_bosses_killed"`
			MythicBossesKilled int    `json:"mythic_bosses_killed"`
		} `json:"awakened-amirdrassil-the-dreams-hope"`
		AwakenedVaultOfTheIncarnates struct {
			Summary            string `json:"summary"`
			TotalBosses        int    `json:"total_bosses"`
			NormalBossesKilled int    `json:"normal_bosses_killed"`
			HeroicBossesKilled int    `json:"heroic_bosses_killed"`
			MythicBossesKilled int    `json:"mythic_bosses_killed"`
		} `json:"awakened-vault-of-the-incarnates"`
		VaultOfTheIncarnates struct {
			Summary            string `json:"summary"`
			TotalBosses        int    `json:"total_bosses"`
			NormalBossesKilled int    `json:"normal_bosses_killed"`
			HeroicBossesKilled int    `json:"heroic_bosses_killed"`
			MythicBossesKilled int    `json:"mythic_bosses_killed"`
		} `json:"vault-of-the-incarnates"`
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
		AberrusTheShadowedCrucible struct {
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
		} `json:"aberrus-the-shadowed-crucible"`
		AmirdrassilTheDreamsHope struct {
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
		} `json:"amirdrassil-the-dreams-hope"`
		AwakenedAberrusTheShadowedCrucible struct {
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
		} `json:"awakened-aberrus-the-shadowed-crucible"`
		AwakenedAmirdrassilTheDreamsHope struct {
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
		} `json:"awakened-amirdrassil-the-dreams-hope"`
		AwakenedVaultOfTheIncarnates struct {
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
		} `json:"awakened-vault-of-the-incarnates"`
		VaultOfTheIncarnates struct {
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
		} `json:"vault-of-the-incarnates"`
	} `json:"raid_rankings"`
}

//must be current tier, no season 4 listing
type ExtractedGuildProg struct {
	GuildName   string `json:"name"`
	RaidName    string
	Summary     string `json:"summary"`
	TotalBosses int64  `json:"total_bosses"`
	NormalKills int64  `json:"normal_bosses_killed"`
	HeroicKills int64  `json:"heroic_bosses_killed"`
	MythicKills int64  `json:"mythic_bosses_killed"`
}
