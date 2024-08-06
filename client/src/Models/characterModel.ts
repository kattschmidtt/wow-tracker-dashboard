interface Spell {
  id: number;
  school: number;
  icon: string;
  name: string;
  rank: string | null;
}

interface AzeritePower {
  id: number;
  spell: Spell;
  tier: number;
}

interface Corruption {
  added: number;
  resisted: number;
  total: number;
  cloakRank: number;
  spells: any[];
}

interface DominationShard {}

export interface Item {
  item_id: number;
  item_level: number;
  enchant: number;
  icon: string;
  name: string;
  item_quality: number;
  is_legendary: boolean;
  is_azerite_armor: boolean;
  azerite_powers: (AzeritePower | null)[];
  corruption: Corruption;
  domination_shards: DominationShard[];
  tier: string;
  gems: number[];
  bonuses: number[];
}

interface Gear {
  updated_at: string;
  item_level_equipped: number;
  item_level_total: number;
  artifact_traits: number;
  corruption: Corruption;
  items: {
    head: Item;
    neck: Item;
    shoulder: Item;
    back: Item;
    chest: Item;
    waist: Item;
    shirt: Item;
    wrist: Item;
    hands: Item;
    legs: Item;
    feet: Item;
    finger1: Item;
    finger2: Item;
    trinket1: Item;
    trinket2: Item;
    mainhand: Item;
    offhand: Item;
  };
}

export interface Character {
  name: string;
  race: string;
  class: string;
  active_spec_name: string;
  active_spec_role: string;
  gender: string;
  faction: string;
  achievement_points: number;
  honorable_kills: number;
  thumbnail_url: string;
  region: string;
  realm: string;
  last_crawled_at: string;
  profile_url: string;
  profile_banner: string;
  gear: Gear;
}


