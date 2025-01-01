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

const Stats = () => {
  const {stats, error, isLoading} = useContext(CharacterItemsContext);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!stats) {
    return null; 
  }

  console.log('Rendering Stats component with data:', stats);

  if (!stats || stats instanceof Error) {
    return <div>Error loading stats data.</div>;
  }

  const statIcons: Partial<Record<keyof StatsModel, React.ReactNode>> = {
    health: <FavoriteIcon />,
    power: <PsychologyIcon />,
    speed: <DirectionsRunIcon />,
    strength: <SportsMartialArtsIcon />,
    agility: <InsightsIcon />,
    intellect: <HandymanIcon />,
    stamina: <PersonAddAlt1Icon />,
  };


  return (
    <div>
      <h3>Stats</h3>
      <Grid container spacing={3}>
        {Object.entries(stats).map(([key, value]) => (
          <Grid item key={key}>
            <Tooltip title={key.toUpperCase()} arrow>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {statIcons[key as keyof StatsModel]} {/* Display the icon if it exists */}
                <span style={{ marginLeft: 8 }}>
                  {prettyNumberFormat(value)}
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