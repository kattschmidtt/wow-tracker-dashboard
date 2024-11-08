import React, { useContext } from 'react';
import { CharacterItemsContext } from '../../context/CharacterContext';
import { CircularProgress, Grid, Tooltip } from '@mui/material';
import { convertToPercentage, prettyNumberFormat } from '../../util/util';
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
  const data = {"hehe":"haha"}; // Replace with the actual stats data passed

  console.log('Rendering Stats component with data:', data);

  if (!data || data instanceof Error) {
    return <div>Error loading stats data.</div>;
  }

  return (
    <div>
      <h3>Stats</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Stats;