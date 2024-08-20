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
  return (
    <div>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {/* First row: Health, Intellect, Stamina, Strength */}
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3} sm={3} md={3}>
            <Tooltip title="If this hits 0 you die">
              <span> <FavoriteIcon /> Health: {prettyNumberFormat(stats.health)}</span>
            </Tooltip>
          </Grid>
          <Grid item xs={3} sm={3} md={3}>
            <Tooltip title="Increases spell power and resource to spend on spells">
              <span> <PsychologyIcon /> Intellect: {prettyNumberFormat(stats.intellect)}</span>
            </Tooltip>
          </Grid>
          <Grid item xs={3} sm={3} md={3}>
            <Tooltip title="Increases Health">
              <span><PersonAddAlt1Icon /> Stamina: {prettyNumberFormat(stats.stamina)}</span>
            </Tooltip>
          </Grid>
          <Grid item xs={3} sm={3} md={3}>
            <Tooltip title="Increases the magnitude of your attacks and abilities">
              <span><SportsMartialArtsIcon /> Strength: {prettyNumberFormat(stats.strength)}</span>
            </Tooltip>
          </Grid>
        </Grid>

        {/* Second row: Other stats */}
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3} sm={3} md={3}>
            <Tooltip title="Increases the magnitude of your attacks and abilities">
              <span><SportsMartialArtsIcon /> Agility: {prettyNumberFormat(stats.agility)}</span>
            </Tooltip>
          </Grid>
          <Grid item xs={3} sm={3} md={3}>
            {/* TODO: make this change based on selected characters class */}
          <Tooltip title="Increases damage dealt by X% for each of the priest's three DoTs on the target. All targets receive the maximum effect during Voidform">
            <span><InsightsIcon /> Mastery: {convertToPercentage(stats.mastery)}</span>
          </Tooltip>
          </Grid>
          <Grid item xs={3} sm={3} md={3}>
            <Tooltip title="Increases damage and healing done and decreases taken">
              <span><HandymanIcon /> Versatility: {Math.floor(stats.versatility / 100)}%</span>
            </Tooltip>
          </Grid>
          <Grid item xs={3} sm={3} md={3}>
            <Tooltip title="Increases attack speed and focus regeneration">
              <span><DirectionsRunIcon /> Haste: {convertToPercentage(stats.spell_haste)}</span>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Stats;