import { createContext, useEffect, useState, ReactNode } from "react";
import { GuildProgModel } from "../Models/guildModel";

export const GuildContext = createContext<{
  guildProg: GuildProgModel;
  isLoading: boolean;
  error: string | null;
  bossSlug: string | null;
  setBossSlug: (slug: string) => void;
}>({
  guildProg: {
    guildName: "",
    raidName: "",
    summary: "",
    totalBosses: 0,
    normalKills: 0,
    heroicKills: 0,
    mythicKills: 0,
  },
  isLoading: true,
  error: null,
  bossSlug: "",
  setBossSlug: () => {},
});

interface GuildProviderProps {
  children: ReactNode;
}

export const GuildProgProvider = ({
  children,
}: GuildProviderProps): JSX.Element => {
  const [guildProg, setGuildProg] = useState<GuildProgModel>({
    guildName: "",
    raidName: "",
    summary: "",
    totalBosses: 0,
    normalKills: 0,
    heroicKills: 0,
    mythicKills: 0,
  });
  const [bossSlug, setBossSlug] = useState<string>(""); //must be present
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/getGuildProgress")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was no bueno");
        }
        return response.json();
      })
      .then((data) => {

        const prettyRaidName = (raidName: string) => {
          return raidName
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        };

        const mappedData: GuildProgModel = {
          guildName: data.name,
          raidName: prettyRaidName(data.RaidName),
          summary: data.summary,
          totalBosses: data.total_bosses,
          normalKills: data.normal_bosses_killed,
          heroicKills: data.heroic_bosses_killed,
          mythicKills: data.mythic_bosses_killed,
        };
        setGuildProg(mappedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to get guild progress");
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/detailedEncounter?bossSlug=${bossSlug}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was no bueno");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to get detailed encounter data");
        setIsLoading(false);
      });
  }, []);

  return (
    <GuildContext.Provider
      value={{ guildProg, isLoading, error, bossSlug, setBossSlug }}
    >
      {children}
    </GuildContext.Provider>
  );
};
