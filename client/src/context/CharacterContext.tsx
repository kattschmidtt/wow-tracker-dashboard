import { createContext, ReactNode, useEffect, useState } from "react";
import { Item } from "../Models/characterModel";

const ExtractedItemsContext = createContext<ExtractedItems | undefined>(undefined);

interface ExtractedItems {
  [key: string]: Item;
}

interface ExtractedItemsProviderProps {
  children: ReactNode; 
}

export const CharacterProvider = ({ children } : ExtractedItemsProviderProps ): JSX.Element => {
  const [items, setItems] = useState<Item>()
  useEffect(() => {
    fetch('http://localhost:8080/characterGear')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response failed')
        }
        return response.json();
      })
      .then((data: string) => {
        console.dir(JSON.parse(data))
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <ExtractedItemsContext.Provider value={{  }}>
      {children}
    </ExtractedItemsContext.Provider>
  )
}