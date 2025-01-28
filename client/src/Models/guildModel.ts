export interface GuildProgModel {
  guildName: string
  raidName: string
  summary: string
  totalBosses: number
  normalKills: number
  heroicKills: number
  mythicKills: number
}

export interface GuildMemberModel {
  character: Character
  name: string
  faction: string
  region: string
  realm: string
  last_crawled_at: string
  profile_url: string
  members: MemberOutter[]
}

export interface MemberOutter {
  rank: number
  character: Character
}

export interface Character {
  name: string
  race: string
  class: string
  active_spec_name?: string
  active_spec_role?: string
  gender: string
  faction: string
  achievement_points: number
  region: string
  realm: string
  last_crawled_at: string
  profile_url: string
  profile_banner: string
  use_animated_banner?: boolean
}

export interface GuildKillRank {
  name: string
  faction: string
  region: string
  realm: string
  last_crawled_at: string
  profile_url: string
  raid_rankings: RaidRankings
}

export interface RaidRankings {
  "nerubar-palace": NerubarPalace
}

export interface NerubarPalace {
  normal: Normal
  heroic: Heroic
  mythic: Mythic
}

export interface Normal {
  world: number
  region: number
  realm: number
}

export interface Heroic {
  world: number
  region: number
  realm: number
}

export interface Mythic {
  world: number
  region: number
  realm: number
}
