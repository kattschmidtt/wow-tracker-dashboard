import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { NavLink } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from 'react';
import { BorderColor } from '@mui/icons-material';
import { Grid } from '@mui/material';

interface CharacterCardProps {
  charId: number;
  name: string;
  favorite: boolean;
}

const CharacterCard = (props: CharacterCardProps ) => {

  const {charId, name, favorite} = props;
  const [isFavorite, setIsFavorite] = useState(favorite); //false for now, default value will be based on user context

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

  const handleSetFavorite = (e: React.MouseEvent<SVGSVGElement>) => {
    //when user presses heart button, set it as favorite to backend
    setIsFavorite(!isFavorite);
    //update userContext in db
    console.log('toggled ', !isFavorite);
  }

  return (
    <div>
      <Card sx={{ minWidth: 220, paddingBottom: '1rem', paddingTop: '1rem'}}> 
        <Grid container>
          <Grid item xs={8}>
            <CardContent component={NavLink} to={`/${name}-${charId}`} sx={cardNavStyles}>
              {name}
            </CardContent>
          </Grid>
          <Grid>
          <CardContent >
            {isFavorite ? (
              <FavoriteIcon onClick={handleSetFavorite} sx={{
                color: '#FF91AF',
                '&:hover': {
                  color: '#FF69B4',
                },
              }} />
            ) : (
              <FavoriteBorderIcon onClick={handleSetFavorite} sx={{
                '&:hover': {
                  color: '#FF69B4',
                },
              }}/>
            )}
          </CardContent>
          </Grid>
        </Grid>
      </Card>
      
    </div>
  );
};

export default CharacterCard;