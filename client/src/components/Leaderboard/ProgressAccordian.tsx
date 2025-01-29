import { Accordion, AccordionSummary, AccordionDetails, TableContainer, Table, TableBody, TableCell, TableRow, Paper } from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import CloseIcon from '@mui/icons-material/Close';
import { RaidModel } from '../../Models/raidModel';

interface ProgressAccordionProps {
  title: string;
  count?: number; //optional
  max?: number; //optional 
  bosses: RaidModel[] | null;
  onChange: (event: React.SyntheticEvent, newExpanded: boolean) => void;
  expanded: boolean;
  limit?: number; //optional
}

const ProgressAccordion: React.FC<ProgressAccordionProps> = ({title, count, max, bosses, onChange, expanded, limit}) => {
  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        aria-controls={`panel-content-${title}`}
        id={`panel-header-${title}`}
      >
        <span>{title} {count}/{max}</span>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {bosses ? (
                bosses.map((boss, idx) => (
                  <TableRow sx={{ fontFamily: 'Poppins' }} key={boss.id}>
                    <TableCell sx={{ fontFamily: 'Poppins' }}>
                      <b>{boss.name}</b>
                    </TableCell>
                    <TableCell >
                      {idx < limit ? (
                        <CloseIcon sx={{ color: 'red' }} /> 
                      ) : (
                        <img src="/SkullIcon.png" alt="Skull Icon" style={{ width: 24, height: 24 }} /> 
                      )}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins' }}>
                      <b>{count}/{max}</b>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>No bosses available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};

export default ProgressAccordion;
