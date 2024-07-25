import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { RaiderContext } from '../../context/RaiderIoContext';
import { CircularProgress } from '@mui/material';
import '../../App.css';

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


const ThisWeekTracking = () => {
  const [expanded, setExpanded] = React.useState<string | false>('panel0');
  const { affixes, isLoading, error } = React.useContext(RaiderContext);

  const handleChange = (panel: string) => (e: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {affixes.map((affix, key) => (
        <Accordion key={key} expanded={expanded === `panel${key}`} onChange={handleChange(`panel${key}`)}>
          <AccordionSummary  aria-controls={`panel${key}d-content`} id={`panel${key}d-header`}>
            {affix.name}
          </AccordionSummary>
          <AccordionDetails>
            {/*TODO: make this style prettier and more readable*/}
            <p style={{
              backgroundImage: `url("https://wow.zamimg.com/images/wow/icons/large/${affix.icon}.jpg")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              height: '100px',
              color: 'white',
              padding: '10px',
              margin: '0',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              }}>{affix.description}</p>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default ThisWeekTracking;