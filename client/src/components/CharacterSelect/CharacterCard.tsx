import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

interface CharacterCardProps {
  charId: number;
  name: string;
}

const CharacterCard = (props: CharacterCardProps ) => {

  const {charId, name} = props;

  return (
    <div>
      <Card sx={{ minWidth: 220}}> 
        <CardContent>
          {name}
        </CardContent>
      </Card>
      
    </div>
  );
};

export default CharacterCard;