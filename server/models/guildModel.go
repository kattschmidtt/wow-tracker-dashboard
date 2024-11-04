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
		} `json:"aberrus-the-shadowed-crucible"`
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
