package models

import (
	"time"
)

type LeaderboardModel struct {
	Name               string    `json:"name"`
	Race               string    `json:"race"`
	Class              string    `json:"class"`
	ActiveSpecName     string    `json:"active_spec_name"`
	ActiveSpecRole     string    `json:"active_spec_role"`
	Gender             string    `json:"gender"`
	Faction            string    `json:"faction"`
	AchievementPoints  int       `json:"achievement_points"`
	HonorableKills     int       `json:"honorable_kills"`
	ThumbnailURL       string    `json:"thumbnail_url"`
	Region             string    `json:"region"`
	Realm              string    `json:"realm"`
	LastCrawledAt      time.Time `json:"last_crawled_at"`
	ProfileURL         string    `json:"profile_url"`
	ProfileBanner      string    `json:"profile_banner"`
	MythicPlusBestRuns []struct {
		Dungeon             string    `json:"dungeon"`
		ShortName           string    `json:"short_name"`
		MythicLevel         int       `json:"mythic_level"`
		CompletedAt         time.Time `json:"completed_at"`
		ClearTimeMs         int       `json:"clear_time_ms"`
		ParTimeMs           int       `json:"par_time_ms"`
		NumKeystoneUpgrades int       `json:"num_keystone_upgrades"`
		MapChallengeModeID  int       `json:"map_challenge_mode_id"`
		ZoneID              int       `json:"zone_id"`
		Score               float64   `json:"score"`
		Affixes             []struct {
			ID          int    `json:"id"`
			Name        string `json:"name"`
			Description string `json:"description"`
			Icon        string `json:"icon"`
			WowheadURL  string `json:"wowhead_url"`
		} `json:"affixes"`
		URL string `json:"url"`
	} `json:"mythic_plus_best_runs"`
}

type ExtractedRun struct {
	CompletedAt time.Time        `json:"completed_at"`
	Dungeon     string           `json:"dungeon"`
	Level       int              `json:"mythic_level"`
	Score       int64            `json:"score"`
	AffixList   []AffixesBestRun `json:"affixes"`
	ClearTimeMs int              `json:"clear_time_ms"`
}

type AffixesBestRun struct {
	Description string `json:"description"`
	Icon        string `json:"icon"`
	Id          int    `json:"id"`
	Name        string `json:"name"`
	WowheadUrl  string `json:"wowhead_url"`
}

type ExtractedBestRuns []ExtractedRun
