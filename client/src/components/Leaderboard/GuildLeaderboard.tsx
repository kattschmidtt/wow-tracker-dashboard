import { Box, Paper, TableContainer, Table, TableHead, TableBody, TableCell, TableRow, CircularProgress } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { GuildContext } from '../../context/GuildContext';
import { RaidModel } from '../../Models/raidModel';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import ProgressAccordion from './ProgressAccordian';

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

const GuildLeaderboard = () => {
  const [expanded, setExpanded] = useState<string | false>('panel0');
  const [bosses, setBosses] = useState<RaidModel[] | null>(null)
  const [error, setError] = useState<string | null>(null);
  const { guildProg } = useContext(GuildContext);

  useEffect(() => {
    //console.log('guild prog: ', guildProg)

    //using in component fetch since we won't need this state globally
    fetch('http://localhost:8080/staticRaidData')
    .then(resp => {
      if (!resp.ok) {
        throw new Error('Network response was no bueno')
      }
      return resp.json();
    })
    .then(data => {
      //console.log('static raid info: ', data)
      setBosses(data)
      setIsLoading(false);
    })
    .catch(err => {
      console.log(err);
      setIsLoading(false);
      setError(err)
    })
  }, [guildProg])

  const handleChange = (panel: string) => (e: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box sx={{ width: '100%' }}>
    <Paper sx={{ width: '100%', mb: 2, pt: '1rem' }}>
      {isLoading ? (<CircularProgress />)
      : (
        <>
          <span><b>{guildProg.guildName}: {guildProg.summary}</b></span>
          <br/>
          <span><b>{guildProg.raidName}</b></span>
          <br />
          <br />
          <ProgressAccordion
            title="Mythic"
            count={guildProg.mythicKills}
            max={8}
            bosses={bosses}
            onChange={handleChange('panel1')}
            expanded={expanded === 'panel1'}
            limit={guildProg.mythicKills} 
          />

          <ProgressAccordion
            title="Heroic"
            count={guildProg.heroicKills}
            max={8}
            bosses={bosses}
            onChange={handleChange('panel2')}
            expanded={expanded === 'panel2'}
            limit={guildProg.heroicKills} 
          />

          <ProgressAccordion
            title="Normal"
            count={guildProg.normalKills}
            max={8}
            bosses={bosses}
            onChange={handleChange('panel3')}
            expanded={expanded === 'panel3'}
            limit={guildProg.normalKills} 
          />
        </>
      )}
      
    </Paper>
  </Box>
  );
};

export default GuildLeaderboard;