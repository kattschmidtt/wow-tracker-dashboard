import { Boss } from '../../Models/raidModel.ts';
import { GuildContext } from '../../context/GuildContext.tsx';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import { Box, Paper } from '@mui/material';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { AffixContext } from '../../context/AffixContext';
import { CircularProgress } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import '../../App.css';
import ProgressAccordion from '../Leaderboard/ProgressAccordian.tsx';
import {GuildKillRank} from '../../Models/guildMode.ts';

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


const Rankings = () => {
  const { bossSlug, setBossSlug } = useContext(GuildContext);
  const { guildProg } = useContext(GuildContext);
  const [boss, setBoss] = useState<string>("");
  const [bosses, setBosses] = useState<RaidModel[] | null>(null);
  const [rank, setRank]= useState<GuildKillRank | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = React.useState<string | false>('');

  const handleChange = (panel: string) => (e: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    fetch('http://localhost:8080/staticRaidData')
    .then(resp => {
      if (!resp.ok) {
        throw new Error('Network response no bueno');
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
    })
  }, [guildProg])
  
  useEffect(() => {
    fetch('http://localhost:8080/killRank')
    .then(resp => {
      if (!resp.ok) {
        throw new Error('Network response no bueno');
      }
      return resp.json(); 
    })
    .then(data => {
      setRank(data);
      setIsLoading(false);
    })
    .catch(err => {
      console.log(err);
      setIsLoading(false);
      setError(err);
    })
  }, [])
  
console.log('rank out of use: ', rank);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
  <Box sx={{ width: '100%' }}>
    <Paper sx={{ width: '100%', mb: 2, pt: '1rem' }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <span><b>Rankings</b></span>
          <br />
          <span><b>{guildProg.raidName}</b></span>
          <br />
          <br />
          {bosses && rank ? (
            <ProgressAccordion
              title="Mythic"
              count={rank['raid_rankings']['nerubar/-palace']['mythic']['realm']} // Adjust path to match your data structure
              max={8}
              bosses={bosses}
              onChange={handleChange('panel1')}
              expanded={expanded === 'panel1'}
              limit={guildProg.mythicKills} 
            />
          ) : (
            <div>No data available</div>
          )}
        </>
      )}
    </Paper>
  </Box>
);
};

export default Rankings;
