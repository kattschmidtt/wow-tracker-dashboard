import { Padding } from '@mui/icons-material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { NavLink } from 'react-router-dom';

interface CharacterCardProps {
  charId: number;
  name: string;
}

const CharacterCard = (props: CharacterCardProps ) => {

  const {charId, name} = props;

  const cardNavStyles = {
    color: 'inherit',
    textDecoration: 'none', 
    typography: 'h6',
    '&:hover': {
      color: 'grey.500'
    },
    '&.active': {
      color: 'text.secondary'
    },
    fontFamily: 'Poppins',
  };

  return (
    <div>
      <Card sx={{ minWidth: 220, paddingBottom: '1rem', paddingTop: '1rem'}}> 
        <CardContent component={NavLink} to={`/${name}-${charId}`} sx={cardNavStyles} >
          {name}
        </CardContent>
      </Card>
      
    </div>
  );
};

export default CharacterCard;