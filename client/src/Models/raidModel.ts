export interface RaidModel {
  raids: Raid[]
}

export interface Raid {
  id: number
  slug: string
  name: string
  short_name: string
  icon: string
  starts: Starts
  ends: Ends
  encounters: Encounter[]
}

export interface Starts {
  us: string
  eu: string
  tw: string
  kr: string
  cn: string
}

export interface Ends {
  us: string
  eu: string
  tw: string
  kr: string
  cn: string
}

export interface Encounter {
  id: number
  slug: string
  name: string
}
