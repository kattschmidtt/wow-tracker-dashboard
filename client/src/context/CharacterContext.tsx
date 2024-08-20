import { createContext, ReactNode, useEffect, useState } from "react";
import { Gear, Item, Stats, Talents } from "../Models/characterModel";

interface CharacterItemsContextType {
  gear: Item[] | undefined;
  error: string | null;
  isLoading: boolean;
  leftItems: Item[];
  rightItems: Item[];
  stats: Stats | null;
  talents: Talents | null;
}

export const CharacterItemsContext = createContext<CharacterItemsContextType>({
  gear: undefined,
  error: null,
  isLoading: true,
  leftItems: [],
  rightItems: [],
  stats: null,
  talents: null,
});

interface CharacterItemsProviderProps {
  children: ReactNode; 
}

export const CharacterProvider = ({ children }: CharacterItemsProviderProps): JSX.Element => {
  const [gear, setGear] = useState<Item[] | undefined>(undefined);
  const [leftItems, setLeftItems] = useState<Item[]>([]);
  const [rightItems, setRightItems] = useState<Item[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [talents, setTalents] = useState<Talents | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('http://localhost:8080/characterGear')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response failed')
        }
        return response.json()
      })
      .then((data: Gear) => {
        const parsedData = JSON.parse(data)
        if (parsedData && parsedData.gear && parsedData.gear.items) {
          const left: Item[] = []
          const right: Item[] = []
          const items = parsedData.gear.items
  
          const midpoint = Math.floor(Object.keys(items).length / 2)
  
          Object.keys(items).forEach((slot, index) => {
            const itemName = items[slot].name
            if (index < midpoint) {
              left.push(itemName)
            } else {
              right.push(itemName)
            }
          })
  
          setLeftItems(left)
          setRightItems(right)
          setGear(items)
          setIsLoading(false)
          //console.log(`Left Items: ${left}`)
          //console.log(`Right Items: ${right}`)
        } else {
          setError('Invalid data struct')
          setIsLoading(false)
        }
      })
      .catch(err => {
        console.error('Failed to do the things it was supposed to')
        setError(err)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    fetch('http://localhost:8080/characterStats')
    .then(response => {
      if (!response.ok) throw new Error('Network response error')
      return response.json()
    })
    .then((data: Stats) => {
      console.log(data)
      setStats(data)
      setIsLoading(false)
    })
    .catch(err => {
      console.error('Failed to get character stats')
      setError(err)
      setIsLoading(false)
    })
  }, [])
  
  useEffect(() => {
    fetch('http://localhost:8080/characterTalents')
    .then(response => {
      if (!response.ok) throw new Error('Network response error')
        return response.json()
    })
    .then((data: Talents) => {
      console.log(data)
      setTalents(data)
      setIsLoading(false)
    })
    .catch(err => {
      console.error('Failed to get character stats')
      setError(err)
      setIsLoading(false)
    })
  }, [])

  return (
    <CharacterItemsContext.Provider value={{ gear, leftItems, rightItems, stats, talents, error, isLoading }}>
      {children}
    </CharacterItemsContext.Provider>
  );
};
