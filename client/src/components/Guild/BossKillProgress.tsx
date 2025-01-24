import {
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
} from "@mui/material";
import React, { useEffect, useState, useMemo, useContext } from "react";
import { Boss } from "../../Models/raidModel";
import { GuildContext } from "../../context/GuildContext";

const BossKillProgress = () => {
  const { bossSlug, setBossSlug } = useContext(GuildContext);
  const [bosses, setBosses] = useState<Boss[] | null>(null);
  const [boss, setBoss] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Mythic");

  const difficultyTabs: string[] = ["Normal", "Heroic", "Mythic"];

  const handleChange = (event: SelectChangeEvent) => {
    const selectedBossName = event.target.value;
    const selectedBoss = bosses?.find((item) => item.name === selectedBossName);
    if (selectedBoss) {
      setBossSlug(selectedBoss.slug);
    }
  };

  const handleTabSwitch = (newTab: string) => {
    setActiveTab(newTab);
  };

  const iFrameSrc = useMemo(() => {
    let difficulty = "mythic";
    if (activeTab === "Normal") {
      difficulty = "normal";
    } else if (activeTab === "Heroic") {
      difficulty = "heroic";
    }

    return bossSlug
      ? `https://raider.io/widgets/health-over-attempt?raid=latest&type=attempt&period=until_kill&difficulty=${difficulty}&guilds=us%2Fproudmoore%2FAcrimonious&boss=${bossSlug}`
      : "";
  }, [activeTab, bossSlug]);

  useEffect(() => {
    fetch("http://localhost:8080/staticRaidData")
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response was no bueno");
        }
        return resp.json();
      })
      .then((data: Boss[]) => {
        setBosses(data);

        //make sure there is a boss slug selected and that data is available
        if (!bossSlug && data.length > 0) {
          setBossSlug(data[0].name);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
        <div style={{ width: "200px" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabSwitch}
            orientation="vertical"
          >
            {difficultyTabs.map((tab) => (
              <Tab
                label={tab}
                key={tab}
                value={tab}
                sx={{ color: "black", fontFamily: "Poppins" }}
              />
            ))}
          </Tabs>
        </div>

        <div style={{ flexGrow: 1 }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <FormControl sx={{ minWidth: 120 }} size="small">
                  <Select
                    value={
                      bosses?.find((item) => item.slug === bossSlug)?.name ||
                      "Ulgrax, The Devourer"
                    }
                    onChange={handleChange}
                    displayEmpty
                  >
                    {bosses &&
                      bosses.map((item) => (
                        <MenuItem key={item.id} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <h4 style={{ margin: 0 }}>Kill Progress</h4>
              </div>
              {bossSlug && (
                <div style={{ marginTop: "20px" }}>
                  <iframe
                    src={iFrameSrc}
                    title="Raider.IO Widget"
                    style={{
                      width: "100%",
                      height: "600px",
                      border: "none",
                      overflow: "hidden",
                    }}
                    loading="lazy"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BossKillProgress;
