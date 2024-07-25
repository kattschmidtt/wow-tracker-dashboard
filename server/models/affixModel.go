package models

type Affix struct {
	Region         string       `json:"region"`
	Title          string       `json:"title"`
	LeaderboardURL string       `json:"leaderboard_url"`
	AffixDetails   AffixDetails `json:"affix_details"`
}

type AffixDetails struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Icon        string `json:"icon"`
	WowheadURL  string `json:"wowhead_url"`
}
