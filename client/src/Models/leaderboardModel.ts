export interface LeaderboardModel {
  completed_at: string
  dungeon: string
  mythic_level: number
  score: number
  affixes: AffixList[]
  clear_time_ms: string
}

interface AffixList {
  description: string
  icon: string
  id: number
  name: string
  wowheadUrl: string
}
