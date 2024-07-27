export interface MythicPlusModel {
  affixes: AffixList[];
  bestTime: string;
  dungeonName: string;
  id: number;
  rating: number;
  score: number;
  worldRanking: number;
}

interface AffixList {
  description: string
  icon: string
  id: number
  name: string
  wowheadUrl: string
}
