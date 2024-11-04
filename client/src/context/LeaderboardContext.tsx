import { createContext, ReactNode, useEffect, useState } from "react";
import { LeaderboardModel } from "../Models/leaderboardModel";

export const LeaderboardContext = createContext<{
  leaderboard: LeaderboardModel[];
  isLoading: boolean;
  error: string | null;
}>({
  leaderboard: [],
  isLoading: true,
  error: null,
})

interface LeaderboardProviderProps {
  children: ReactNode;
}

export const LeaderboardProvider = ({ children } : LeaderboardProviderProps ): JSX.Element => {

  const [leaderboard, setLeaderboard] = useState<LeaderboardModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/getSeasonalDungeons')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response failed');
        }
        return response.json();
      })
      .then((data: LeaderboardModel[]) => {
        console.log(data)
        setLeaderboard(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to do stuff that it was supposed to do ')
        setIsLoading(false)
      })
  }, [])

  return (
    <LeaderboardContext.Provider value={{ leaderboard, isLoading, error }}>
      {children}
    </LeaderboardContext.Provider>
  )
}