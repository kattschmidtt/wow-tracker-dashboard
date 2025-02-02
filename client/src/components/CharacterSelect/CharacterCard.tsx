import Card from "@mui/material/Card";
import Slide from "@mui/material/Slide";
import CardContent from "@mui/material/CardContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState, useRef } from "react";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

interface CharacterCardProps {
  charId: number;
  name: string;
  favorite: boolean;
}

// Styled component for iframe to have slide in and out animation based on favorite
const IFrameComponent = styled("div")(() => ({
  width: "100%", //container takes up 100% of parent
  height: "100%", //based on viewport height
  overflow: "hidden",
  position: "relative",
  margin: 0,
  padding: 0,
  "& iframe": {
    //elements within IframeComponent
    width: "100%",
    height: "100%",
    border: "none",
    display: "block",
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
}));

const CharacterCard = (props: CharacterCardProps) => {
  const { charId, name, favorite } = props;
  const [isFavorite, setIsFavorite] = useState(favorite);
  const containerRef = useRef<HTMLElement>(null);

  const widgetUrl =
    "https://raider.io/characters/us/stormrage/Foxxbozo?embed=1&embedmode=&embedName=1&classcolors=1&showtime=10&chromargb=transparent";

  const cardNavStyles = {
    textDecoration: "none",
    typography: "h6",
    "&.active": {
      color: "text.secondary",
    },
    fontFamily: "Poppins",
  };

  const handleSetFavorite = (e: React.MouseEvent<SVGSVGElement>) => {
    setIsFavorite(!isFavorite);
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
              sx={{
                ...cardNavStyles,
                padding: 0,
                height: "100%",
                margin: 0,
                boxSizing: "content-box",
              }}
            >
              <div
                ref={containerRef}
                style={{ position: "relative", height: "100%" }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    zIndex: 1,
                  }}
                >
                  <div>{name}</div>
                  <FavoriteBorderIcon
                    onClick={handleSetFavorite}
                    sx={{ "&:hover": { color: "#FF69B4" }, cursor: "pointer" }}
                  />
                </div>
                <Slide
                  in={isFavorite}
                  container={containerRef.current}
                  timeout={600}
                  direction="left"
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      zIndex: 2,
                    }}
                  >
                    <IFrameComponent>
                      <iframe loading="lazy" src={widgetUrl} />
                    </IFrameComponent>
                    <FavoriteIcon
                      onClick={handleSetFavorite}
                      sx={{
                        color: "#FF91AF",
                        position: "absolute",
                        top: 8,
                        right: 8,
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </Slide>
              </div>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default CharacterCard;
