import { createContext, useEffect, useState, ReactNode } from "react";
import { AffixModel } from "../Models/affixModel";

export const AffixContext = createContext<{
  affixes: AffixModel[];
  isLoading: boolean;
  error: string | null;
}>({
  affixes: [],
  isLoading: true,
  error: null,
});

interface AffixProviderProps {
  children: ReactNode;
}

export const AffixProvider = ({ children }: AffixProviderProps): JSX.Element => {
  const [affixes, setAffixes] = useState<AffixModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/affixes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was no bueno');
        }
        return response.json();
      })
      .then((data: AffixModel[]) => {
        setAffixes(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to fetch affixes');
        setIsLoading(false);
      });
  }, []);

  return (
    <AffixContext.Provider value={{ affixes, isLoading, error }}>
      {children}
    </AffixContext.Provider>
  );
};
