import { createContext, ReactNode, useEffect, useState } from "react";
import { Item } from "../Models/characterModel";

interface CharacterItemsContextType {
  gear: Item[] | undefined;
  error: string | null;
  isLoading: boolean;
}

export const CharacterItemsContext = createContext<CharacterItemsContextType>({
  gear: undefined,
  error: null,
  isLoading: true,
});

interface CharacterItemsProviderProps {
  children: ReactNode; 
}

export const CharacterProvider = ({ children } : CharacterItemsProviderProps ): JSX.Element => {
  const [gear, setGear] = useState<Item[] | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch('http://localhost:8080/characterGear')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response failed')
        }
        return response.json()
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((data: any) => {
        const parsedData = JSON.parse(data)
        if (parsedData && parsedData.gear && parsedData.gear.items) {
          setGear(parsedData.gear.items)
          setIsLoading(false)
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

  return (
    <CharacterItemsContext.Provider value={{ gear, error, isLoading }}>
      {children}
    </CharacterItemsContext.Provider>
  )
}