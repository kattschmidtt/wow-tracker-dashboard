import { Button, Card, CardContent, Grid } from "@mui/material";
import motherLogin from "/motherLogin.png";
import { useEffect } from "react";
import { useUserContext } from "../context/userContext";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { login, isLoggedIn, handleCallback } = useUserContext();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      sx={{ minHeight: "100vh", backgroundColor: "#36316b" }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh", backgroundColor: "#36316b" }}
      >
        <Card
          sx={{
            background: "#271a38",
            display: "flex",
            flexDirection: "row",
            overflow: "hidden",
          }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            container
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={motherLogin}
              alt="Mother Login"
              style={{
                maxWidth: "100%",
                height: "auto",
                maxHeight: "100%",
                transition: "transform 0.5s ease-in-out",
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            container
            direction="column"
            justifyContent="center"
          >
            <h2 className="login-text" style={{ color: "white" }}>
              World of Warcraft <br />
              Tracker Dashboard
            </h2>
            <CardContent>
              <Button
                onClick={login}
                variant="contained"
                style={{ background: "#148EFF" }}
              >
                <span className="login-text">
                  <img
                    src="../../public/battle-net-svgrepo-com.svg"
                    style={{ height: "3em", verticalAlign: "middle" }}
                  />
                  &nbsp; Login with Battle.net
                </span>
              </Button>
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
