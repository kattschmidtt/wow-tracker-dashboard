import * as React from 'react';
import { styled } from '@mui/material/styles';
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


const Rankings = () => {
  const [expanded, setExpanded] = useState<string | false>('');
  const [rankings, setRankings] = useState<GuildKillRank | null>(null);
  const [groupComp, setGroupComp] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string|null>(null);
  const { bossSlug } = useContext(GuildContext);

  const handleChange = (panel: string) => (e: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    fetch('http://localhost:8080/killRank')
    .then(resp => {
      if (!resp.ok) {
        throw new Error('Network response no bueno')
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
    })
  }, []);

  useEffect(() => {
    if (bossSlug) {
      setIsLoading(true);
      fetch(`http://localhost:8080/detailedEncounter?bossSlug=${bossSlug}`) // Fetch data based on bossSlug
        .then((resp) => {
          if (!resp.ok) {
            throw new Error('Network response no bueno');
          }
          return resp.json();
        })
        .then((data) => {
          console.log(data)
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.message);
        });
    }
  }, [bossSlug]); 

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <strong>Rankings</strong>
      <br/>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        
        <AccordionSummary
          aria-controls='panel1d-content'
          id='panel1d-header'
        >
          <strong> 
            World: {prettyNumberFormat(rankings?.raid_rankings['nerubar-palace'].mythic.world) ?? '-'} 
            Region: {prettyNumberFormat(rankings.raid_rankings['nerubar-palace'].mythic.region) ?? '-'} 
            Realm: {prettyNumberFormat(rankings.raid_rankings['nerubar-palace'].mythic.realm) ?? '-'}</strong>
        </AccordionSummary>
        <AccordionDetails>
          details 

        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Rankings;