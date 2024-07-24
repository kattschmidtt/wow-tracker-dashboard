export interface AffixRoot {
  region: string
  title: string
  leaderboard_url: string
  affix_details: AffixDetail[]
}

export interface AffixDetail {
  id: number
  name: string
  description: string
  icon: string
  wowhead_url: string
}
