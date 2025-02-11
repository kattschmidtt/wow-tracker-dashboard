import { styled } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { CircularProgress, Tooltip } from "@mui/material";
import "../../App.css";
import { useEffect, useState } from "react";
import { GuildKillRank, NerubarPalace } from "../../Models/guildModel";
import { Boss } from "../../Models/raidModel";
import ParsedColoredText from "../Generics/ParsedColoredText";
import ShieldIcon from "@mui/icons-material/Shield";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh"; //for dps icon
import Diversity3Icon from "@mui/icons-material/Diversity3"; //for average ilvl
import AddIcon from "@mui/icons-material/Add";
import CustomTooltip from "../Generics/CustomToolTip";
import { Link } from "@mui/material";

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
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: theme.palette.text.primary,
  },
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

interface DetailedCharModel {
  name: string;
  className: string;
  itemLevelEquipped: number;
  raceFaction: string;
  race: string;
  region: string;
  isMelee: boolean;
  specName: string;
  specRole: string;
  realmName: string;
  regionSlug: string;
}
//TODO: add these mappings to util files so its not repeated twice (see members.tsx)
//map name colorZ based on class name
const classColorMapping: { [key: string]: string } = {
  "Death Knight": "#C41E3A",
  "Demon Hunter": "#A330C9",
  Druid: "#FF7C0A",
  Evoker: "#33937F",
  Hunter: "#AAD372",
  Mage: "#3FC7EB",
  Monk: "#00FF98",
  Paladin: "#F48CBA",
  Priest: "#FFFFFF",
  Rogue: "#FFF468",
  Shaman: "#0070DD",
  Warlock: "#8788EE",
  Warrior: "#C69B6D",
};

//map tooltip background based on api response
const bannerMapping: { [key: string]: string } = {
  hordebanner1: "/horde-logo-banner.png",
  alliancebanner1: "/alliance-logo-banner.png",
};

const Rankings = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [rankings, setRankings] = useState<NerubarPalace | null>(null);
  const [bosses, setBosses] = useState<Boss[] | null>(null);
  const [avgIlvl, setAvgIlvl] = useState<number | null>(0);
  const [bossKilled, setBossKilled] = useState<boolean>(true);
  const [groupComp, setGroupComp] = useState<GroupCompModel>({
    tanks: 0,
    healers: 0,
    dps: 0,
  });
  const [membersPresent, setMembersPresent] = useState<DetailedCharModel[]>([]); //members present during boss kill
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingBosses, setLoadingBosses] = useState<{
    [key: string]: boolean;
  }>({}); //used to see if all data is updated before showing boss details
  const [error, setError] = useState<string | null>(null);

  const handleChange =
    (panel: string, bossSlug: string) =>
    (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
      //making sure that this is not null
      if (newExpanded && bosses) {
        setLoadingBosses((prev) => ({ ...prev, [bossSlug]: true }));
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
        if (!Array.isArray(data)) {
          console.error("expected an array but recieved: ", data);
          setBossKilled(false);
          setLoadingBosses((prev) => ({ ...prev, [bossSlug]: false })); //stop loading if null or anything else
          return;
        }
        const ilvlArr: number[] = [];
        const initComp: GroupCompModel = { tanks: 0, healers: 0, dps: 0 };
        const initMembers: DetailedCharModel[] = [];

        data.forEach((character) => {
          ilvlArr.push(character.itemLevelEquipped);
          initMembers.push(character);
          //incrementing role
          if (character.specRole === "tank") initComp.tanks += 1;
          if (character.specRole === "dps") initComp.dps += 1;
          if (character.specRole === "healer") initComp.healers += 1;
        });
        setMembersPresent(initMembers);
        setGroupComp(initComp);
        setAvgIlvl(
          Math.floor(
            ilvlArr.length > 0
              ? ilvlArr.reduce((sum, currentValue) => sum + currentValue, 0) /
                  ilvlArr.length
              : 0,
          ),
        );

        setLoadingBosses((prev) => ({ ...prev, [bossSlug]: false }));
        setBossKilled(true);
      })
      .catch((err) => {
        console.log(err);
        setLoadingBosses((prev) => ({ ...prev, [bossSlug]: false }));
        setBossKilled(false);
      });
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!rankings || !bosses) return <div>No data available</div>;

  return (
    <div>
      <h3>Boss Kill Rankings</h3>
      <strong>
        World: <ParsedColoredText number={rankings.mythic.world} /> &nbsp;
        Region: <ParsedColoredText number={rankings.mythic.region} /> &nbsp;
        Realm: <ParsedColoredText number={rankings.mythic.realm} />
      </strong>
      <br />
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2, pt: "1rem" }}>
          {bosses.map((boss, idx) => (
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
                {loadingBosses[boss.slug] ? (
                  <CircularProgress /> // Show spinner while loading
                ) : bossKilled ? (
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
                ) : (
                  <div>Come back when you kill this boss!</div> // Show message if boss has not been killed
                )}
                <br />

                {/* Members present during kill render */}
                {membersPresent.length > 0 ? (
                  membersPresent.map((member, idx) => {
                    const className = member.className;
                    const classColor =
                      classColorMapping[className] || "#ffffff";
                    const banner = "/default-banner.png"; //TODO: ADD profiel_banner TO THINGS THAT SHOULD BE SENT TO FRONTEND

                    return (
                      <CustomTooltip
                        name={member.name}
                        charClass={member.className}
                        spec={member.specName}
                        faction={member.raceFaction}
                        backgroundImageUrl={banner}
                        key={idx}
                      >
                        <span style={{ color: classColor, marginRight: "2px" }}>
                          <Link
                            color="inherit"
                            href={`https://raider.io/characters/${member.regionSlug}/${member.realmName}/${member.name}`}
                            underline="hover"
                          >
                            {member.name} &nbsp;
                          </Link>
                        </span>
                      </CustomTooltip>
                    );
                  })
                ) : (
                  <>no members present</>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>
      </Box>
    </div>
  );
};

export default Rankings;
