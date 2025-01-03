import React, { useContext } from 'react';
import { CharacterItemsContext } from '../../context/CharacterContext';
import { CircularProgress, Grid, Tooltip } from '@mui/material';
import { convertToPercentage, prettyNumberFormat } from '../../util/util';
import { Stats as StatsModel } from '../../Models/characterModel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HandymanIcon from '@mui/icons-material/Handyman';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PsychologyIcon from '@mui/icons-material/Psychology';
import InsightsIcon from '@mui/icons-material/Insights';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';

//extracting wanted fields from large blizz api return
type FilteredStats = {
  key: keyof Pick<
    StatsModel,
    'health' | 
    'strength' |
    'intellect' |
    'agility' |
    'stamina' |
    'mastery' |
    'versatility' | 
    'spell_haste'
  >;
  label: string;
  icon: React.ReactNode;
}

const Stats = () => {
  const {stats, error, isLoading} = useContext(CharacterItemsContext);

  if (isLoading) return <CircularProgress />;

  if (error) return <div>Error: {error}</div>;

  if (!stats) return null; 


  if (!stats || stats instanceof Error) return <div>Error loading stats data.</div>;

  const statConfig: FilteredStats[] = [
    { key: 'health', label: 'Health', icon: <FavoriteIcon /> },
    { key: 'strength', label: 'Strength', icon: <SportsMartialArtsIcon /> },
    { key: 'agility', label: 'Agility', icon: <InsightsIcon /> },
    { key: 'intellect', label: 'Intellect', icon: <HandymanIcon /> },
    { key: 'stamina', label: 'Stamina', icon: <PersonAddAlt1Icon /> },
    { key: 'mastery', label: 'Mastery', icon: <PsychologyIcon /> },
    { key: 'versatility', label: 'Versatility', icon: <DirectionsRunIcon /> },
    { key: 'spell_haste', label: 'Spell Haste', icon: <PsychologyIcon /> },
  ];


  return (
    <div>
      <h3>Stats</h3>
      <Grid container spacing={3} justifyContent="space-evenly">
        {statConfig.map(({ key, label, icon }) => (
          <Grid item key={key}>
            <Tooltip title={label} arrow>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {icon}
                <span style={{ marginLeft: 8 }}>
                  {prettyNumberFormat(stats[key])}
                </span>
              </div>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Stats;