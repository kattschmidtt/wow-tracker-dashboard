import React, { useContext, useEffect } from 'react';
import { CharacterItemsContext } from '../../context/CharacterContext';
import { CircularProgress, Grid } from '@mui/material';
import { Spell } from '../../Models/characterModel';


interface Talents {
  spells: Spell[];
}

const Talents: React.FC = () => {
  const { talents, error, isLoading } = useContext(CharacterItemsContext);

  useEffect(() => {
    console.log(talents);

    if (talents?.spells) {
      console.log("Spells: ", talents.spells)
    }
  }, [talents]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!talents || !talents.spells) {
    return null;
  }

  //every 3rd object in talents array
  const filteredSpells = talents.spells.filter((_: unknown, index: number) => (index + 1) % 3 === 0);

  //dince we want to display 7 object names per row we need to create that array
  const chunkSize = 7;
  const chunks = Array.from({ length: Math.ceil(filteredSpells.length / chunkSize) }, (_, i) =>
    filteredSpells.slice(i * chunkSize, i * chunkSize + chunkSize)
  );

  return (
    <div>
      <Grid container spacing={3}>
        {chunks.map((chunk, chunkIndex) => (
          <Grid container item xs={12} spacing={2} key={chunkIndex}>
            {chunk.map((spell: Spell) => (
              <Grid item xs={12 / chunkSize} key={spell.ID}>
                <div>{spell.Name}</div>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Talents;
