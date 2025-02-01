import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { NavLink } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import { BorderColor } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

interface CharacterCardProps {
  charId: number;
  name: string;
  favorite: boolean;
}

//stlyed component for iframe to have slide in and out animation based on favorite
const IFrameComponent = styled("div")<{ isVisible: boolean }>(
  //adding the isVisible prop to component
  ({ isVisible }) => ({
    width: "100%", //container takes up 100% of parent
    height: "18vh", //based on viewport height
    overflow: "hidden",
    position: "relative",
    transform: isVisible ? "translateX(0)" : "translateX(-100%)", //if visible (favorite is set to true) is true, don't do anything. else do slide out animation
    transition: "transform 0.5s ease-out", // property name | duration | easing function
    "& iframe": {
      //elements within IframeComponent
      width: "100%",
      height: "100%",
      border: "none",
    },
  }),
);

const CharacterCard = (props: CharacterCardProps) => {
  const { charId, name, favorite } = props;
  const [isFavorite, setIsFavorite] = useState(favorite); //false for now, default value will be based on user context
  const [isVisible, setIsVisible] = useState(favorite);
  const widgetUrl =
    "https://raider.io/characters/us/stormrage/Foxxbozo?embed=1&embedmode=summary&embedName=1&classcolors=1&characterBackground=1&itemlevelcolors=1&showtime=10&chromargb=transparent";

  const cardNavStyles = {
    color: "inherit",
    textDecoration: "none",
    typography: "h6",
    "&:hover": {
      color: "grey.500",
    },
    "&.active": {
      color: "text.secondary",
    },
    fontFamily: "Poppins",
  };

  const handleSetFavorite = (e: React.MouseEvent<SVGSVGElement>) => {
    //when user presses heart button, set it as favorite to backend
    setIsFavorite(!isFavorite);
    //update userContext in db
    console.log("toggled ", !isFavorite);
  };

  return (
    <div>
      <Card sx={{ minWidth: 220, paddingBottom: "1rem", paddingTop: "1rem" }}>
        <Grid container>
          <Grid item xs={8}>
            {isFavorite ? (
              <CardContent
                component={NavLink}
                to={`/${name}-${charId}`}
                sx={cardNavStyles}
              >
                <IFrameComponent isVisible={isFavorite}>
                  <iframe src={widgetUrl} />
                </IFrameComponent>
              </CardContent>
            ) : (
              <div>frick</div>
            )}
          </Grid>
          <Grid>
            <CardContent>
              {isFavorite ? (
                <FavoriteIcon
                  onClick={handleSetFavorite}
                  sx={{
                    color: "#FF91AF",
                    "&:hover": {
                      color: "#FF69B4",
                    },
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  onClick={handleSetFavorite}
                  sx={{
                    "&:hover": {
                      color: "#FF69B4",
                    },
                  }}
                />
              )}
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default CharacterCard;
