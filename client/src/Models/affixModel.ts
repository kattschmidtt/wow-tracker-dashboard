export interface Root {
  region: string
  title: string
  leaderboard_url: string
  affix_details: AffixModel[]
}

export interface AffixModel {
  icon_url: string
  id: number
  name: string
  description: string
  icon: string
  wowhead_url: string
}
