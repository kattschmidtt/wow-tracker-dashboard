import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material'
import ProgressAccordian from '../Leaderboard/ProgressAccordian.tsx';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { AffixContext } from '../../context/AffixContext';
import { CircularProgress } from '@mui/material';
import '../../App.css';
import { useContext, useEffect, useState } from 'react';
import { GuildKillRank, RaidRankings } from '../../Models/guildModel';
import { RaidModel } from '../../Models/raidModel';
import { prettyNumberFormat } from '../../util/util';
import { GuildContext } from '../../context/GuildContext';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  }, 
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

interface GroupCompModel {
  tanks: number,
  healers: number,
  dps: number
}

const Rankings = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [rankings, setRankings] = useState<GuildKillRank | null>(null);
  const [bosses, setBosses] = useState<RaidModel[] | null>(null);
  const [avgIlvl, setAvgIlvl] = useState<number | null>(null);
  const [groupComp, setGroupComp] = useState<GroupCompModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (panel: string,  bossSlug: string) => (e: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
    if (newExpanded) {
      determineGroupComp(bossSlug);
    }
  };

  useEffect(() => {
    fetch('http://localhost:8080/killRank')
      .then(resp => {
        if (!resp.ok) {
          throw new Error('Network response no bueno');
        }
        return resp.json();
      })
      .then((data: GuildKillRank) => {
        setRankings(data);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err.message);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/staticRaidData')
      .then(resp => {
        if (!resp.ok) {
          throw new Error('Network response not good');
        }
        return resp.json();
      })
      .then(data => {
        setBosses(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
        setError(err);
      });
  }, [rankings]);

  const determineGroupComp = (bossSlug: string) => {
    fetch(`http://localhost:8080/detailedEncounter?bossSlug=${bossSlug}`)
      .then(resp => {
        if (!resp.ok) {
          throw new Error('Network response not good');
        }
        return resp.json();
      })
      .then(data => {
        console.log(data);
        let ilvlArr = [];
        data.forEach(character => {
          ilvlArr.push(character.itemLevelEquipped);
        });
        setAvgIlvl(Math.floor(ilvlArr.length > 0 ? ilvlArr.reduce((sum, currentValue) => sum + currentValue, 0) / ilvlArr.length : 0));
      })
      .catch(err => {
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
      <strong>Rankings</strong>
      <br />
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2, pt: '1rem' }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            bosses && bosses.map((boss, idx) => (
              <Accordion key={idx} expanded={expanded === `panel${idx}`} onChange={handleChange(`panel${idx}`, boss.slug)}>
                <AccordionSummary aria-controls={`panel${idx}d-content`} id={`panel${idx}d-header`}>
                  {boss.name}
                </AccordionSummary>
                <AccordionDetails>This was your groups average item level for the fight {avgIlvl} </AccordionDetails>
              </Accordion>
            ))
          )}
        </Paper>
      </Box>
    </div>
  );
};

export default Rankings;
