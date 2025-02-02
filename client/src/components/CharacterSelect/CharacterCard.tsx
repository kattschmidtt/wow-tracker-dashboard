import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

interface CharacterCardProps {
  charId: number;
  name: string;
  favorite: boolean;
}

// Styled component for iframe to have slide in and out animation based on favorite
const IFrameComponent = styled("div")<{ isVisible: boolean }>(
  ({ isVisible }) => ({
    width: "100%", //container takes up 100% of parent
    height: "100%", //based on viewport height
    overflow: "hidden",
    position: "relative",
    transform: isVisible ? "translateX(0)" : "translateX(-100%)", //if visible (favorite is set to true) is true, don't do anything. else do slide out animation
    transition: "transform 0.5s ease-out", // property name | duration | easing function
    "& iframe": {
      //elements within IframeComponent
      width: "100%",
      height: "100%",
      border: "none",
      display: "block",
    },
  }),
);

const CharacterCard = (props: CharacterCardProps) => {
  const { charId, name, favorite } = props;
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [isVisible, setIsVisible] = useState(favorite);
  const widgetUrl =
    "https://raider.io/characters/us/stormrage/Foxxbozo?embed=1&embedmode=&embedName=1&classcolors=1&showtime=10&chromargb=transparent";

  const cardNavStyles = {
    color: "inherit",
    textDecoration: "none",
    typography: "h6",
    "&.active": {
      color: "text.secondary",
    },
    fontFamily: "Poppins",
  };

  const handleSetFavorite = (e: React.MouseEvent<SVGSVGElement>) => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    if (newFavoriteStatus) {
      setIsVisible(true); // Show immediately if favorited
    } else {
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }
  };

  return (
    <div>
      <Card
        sx={{
          minWidth: "100%",
          height: "18vh",
          padding: 0,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={12} sx={{ height: "100%" }}>
            <CardContent
              component="div"
              sx={{ ...cardNavStyles, padding: 0, height: "100%", margin: 0 }}
            >
              {isFavorite && isVisible ? (
                <div style={{ display: "relative", height: "100%" }}>
                  <IFrameComponent isVisible={isVisible}>
                    <iframe
                      style={{ display: "block" }}
                      loading="lazy"
                      src={widgetUrl}
                    />
                  </IFrameComponent>
                  <FavoriteIcon
                    onClick={handleSetFavorite}
                    sx={{
                      color: "#FF91AF",
                      position: "absolute",
                      top: 8,
                      right: 8,
                      zIndex: 2, //above the iframe
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    height: "100%", // Take full height of CardContent
                    display: "flex", // Use flexbox for alignment
                    alignItems: "center", // Vertically center content
                    justifyContent: "center", // Horizontally center content
                    gap: "8px", // Add spacing between name and icon
                  }}
                >
                  <div>{name}</div>
                  <FavoriteBorderIcon
                    onClick={handleSetFavorite}
                    sx={{ "&:hover": { color: "#FF69B4" } }}
                  />
                </div>
              )}
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default CharacterCard;
