import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";
import ProgressAccordian from "../Leaderboard/ProgressAccordian.tsx";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { AffixContext } from "../../context/AffixContext";
import { CircularProgress, Tooltip } from "@mui/material";
import "../../App.css";
import { useContext, useEffect, useState } from "react";
import { GuildKillRank, RaidRankings } from "../../Models/guildModel";
import { RaidModel } from "../../Models/raidModel";
import { prettyNumberFormat } from "../../util/util";
import ParsedColoredText from "../Generics/ParsedColoredText";
import { GuildContext } from "../../context/GuildContext";
import ShieldIcon from "@mui/icons-material/Shield";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh"; //for dps icon
import Diversity3Icon from "@mui/icons-material/Diversity3"; //for average ilvl
import AddIcon from "@mui/icons-material/Add";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

interface GroupCompModel {
  tanks: number;
  healers: number;
  dps: number;
}

const Rankings = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [rankings, setRankings] = useState<GuildKillRank | null>(null);
  const [bosses, setBosses] = useState<RaidModel[] | null>(null);
  const [avgIlvl, setAvgIlvl] = useState<number | null>(0);
  const [groupComp, setGroupComp] = useState<GroupCompModel>({
    tanks: 0,
    healers: 0,
    dps: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleChange =
    (panel: string, bossSlug: string) =>
    (e: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
      //making sure that this is not null
      if (newExpanded && bosses) {
        determineGroupComp(bossSlug);
      }
    };

  useEffect(() => {
    fetch("http://localhost:8080/killRank")
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response no bueno");
        }
        return resp.json();
      })
      .then((data: GuildKillRank) => {
        setRankings(data.raid_rankings["nerubar-palace"]); //only available for latest raid
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, []);

  //fetch for bossnames. etc...
  useEffect(() => {
    fetch("http://localhost:8080/staticRaidData")
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response not good");
        }
        return resp.json();
      })
      .then((data) => {
        setBosses(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setError(err);
      });
  }, [rankings]);

  const determineGroupComp = (bossSlug: string) => {
    fetch(`http://localhost:8080/detailedEncounter?bossSlug=${bossSlug}`)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response not good");
        }
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        if (!Array.isArray(data)) {
          console.error("expected an array but recieved: ", data);
          return;
        }
        let ilvlArr = [];
        let initComp: GroupCompModel = { tanks: 0, healers: 0, dps: 0 };

        data.forEach((character) => {
          ilvlArr.push(character.itemLevelEquipped);

          //incrementing role
          if (character.specRole === "tank") initComp.tanks += 1;
          if (character.specRole === "dps") initComp.dps += 1;
          if (character.specRole === "healer") initComp.healers += 1;
        });
        setGroupComp(initComp);
        setAvgIlvl(
          Math.floor(
            ilvlArr.length > 0
              ? ilvlArr.reduce((sum, currentValue) => sum + currentValue, 0) /
                  ilvlArr.length
              : 0,
          ),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h3>Boss Kill Rankings</h3>
      <strong>
        World: <ParsedColoredText number={rankings.mythic.world} /> &nbsp;
        Region : <ParsedColoredText number={rankings.mythic.region} /> &nbsp;
        Realm: <ParsedColoredText number={rankings.mythic.realm} />
      </strong>
      <br />
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2, pt: "1rem" }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            bosses &&
            bosses.map((boss, idx) => (
              <Accordion
                key={idx}
                expanded={expanded === `panel${idx}`}
                onChange={handleChange(`panel${idx}`, boss.slug)}
              >
                <AccordionSummary
                  aria-controls={`panel${idx}d-content`}
                  id={`panel${idx}d-header`}
                >
                  {boss.name}
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Tooltip
                      title="Average item level of the raid during boss kill"
                      followCursor
                      componentsProps={{
                        tooltip: {
                          sx: { fontSize: "1rem" },
                        },
                      }}
                    >
                      <span
                        style={{
                          fontSize: "4rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <Diversity3Icon fontSize="inherit" /> {avgIlvl}
                      </span>
                    </Tooltip>
                    <Tooltip
                      title="Number of tanks present during boss kill"
                      followCursor
                      componentsProps={{
                        tooltip: {
                          sx: { fontSize: "1rem" },
                        },
                      }}
                    >
                      <span
                        style={{
                          fontSize: "4rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <ShieldIcon fontSize="inherit" /> {groupComp.tanks}
                      </span>
                    </Tooltip>
                    <Tooltip
                      title="Number of healers present during boss kill"
                      followCursor
                      componentsProps={{
                        tooltip: {
                          sx: { fontSize: "1rem" },
                        },
                      }}
                    >
                      <span
                        style={{
                          fontSize: "4rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <AddIcon fontSize="inherit" /> {groupComp.healers}
                      </span>
                    </Tooltip>
                    <Tooltip
                      title="Number of dps present during boss kill"
                      followCursor
                      componentsProps={{
                        tooltip: {
                          sx: { fontSize: "1rem" },
                        },
                      }}
                    >
                      <span
                        style={{
                          fontSize: "4rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <AutoFixHighIcon fontSize="inherit" /> {groupComp.dps}
                      </span>
                    </Tooltip>
                  </div>
                  <br />
                  These were the members present during the kill
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </Paper>
      </Box>
    </div>
  );
};

export default Rankings;
