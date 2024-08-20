import React, { useContext } from 'react';
import { CharacterItemsContext } from '../../context/CharacterContext';
import { CircularProgress, Grid } from '@mui/material';
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

  return (
    <div>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={2} sm={4} md={4}>
            <span> <FavoriteIcon /> Health: {prettyNumberFormat(stats.health)}</span>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <span> <PsychologyIcon /> Intellect: {prettyNumberFormat(stats.intellect)}</span>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <span><PersonAddAlt1Icon /> Stamina: {prettyNumberFormat(stats.stamina)}</span>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <span><SportsMartialArtsIcon /> Strength: {prettyNumberFormat(stats.strength)}</span>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <span><SportsMartialArtsIcon /> Agility: {prettyNumberFormat(stats.agility)}</span>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <span><InsightsIcon /> Mastery: {convertToPercentage(stats.mastery)}</span>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <span><HandymanIcon /> Versatility: {Math.floor(stats.versatility / 100)}%</span>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <span><DirectionsRunIcon /> Haste: {convertToPercentage(stats.spell_haste)}</span>
          </Grid>
      </Grid>
    </div>
  );
};

export default Stats;