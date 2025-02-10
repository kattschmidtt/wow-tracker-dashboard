import { useState } from "react";
import Header from "../components/Layout/Header";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  Input,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import Avatar from "boring-avatars";
import NavigationSidebar from "../components/Sidebar/NavigationSidebar";

const Settings = () => {
  const [themeChange, setThemeChange] = useState<themeChoices>("");

  const handleThemeChange = (e: SelectChangeEvent) =>
    setThemeChange(e.target.value);

  return (
    <>
      <Header />
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2} md={2}>
              <NavigationSidebar />
            </Grid>

            <Grid item xs={12} sm={8} md={8}>
              <Box
                component="form"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                  pt: "5rem",
                  pb: "2rem",
                }}
              >
                <Card sx={{ width: "55vh" }}>
                  <CardContent>
                    {/* default, will have user's Battle.net account name */}
                    <Avatar
                      size={40}
                      name="Foxx"
                      variant="marble"
                      colors={[
                        "#92A1C6",
                        "#146A7C",
                        "#F0AB3D",
                        "#C271B4",
                        "#C20D90",
                      ]}
                    />
                    <FormControl
                      fullWidth
                      sx={{
                        m: 7,
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                        display: "flex",
                      }}
                      variant="standard"
                    >
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={2} md={2}>
                          <div>Username</div>
                        </Grid>
                        <Grid item xs={12} sm={2} md={10}>
                          <Input sx={{ fontFamily: "Poppins" }} />
                        </Grid>
                        <Grid item xs={12} sm={2} md={2}>
                          <div>Password</div>
                        </Grid>
                        <Grid item xs={12} sm={10} md={10}>
                          <Input type="password" />
                        </Grid>
                        <Grid item xs={12} sm={2} md={2}>
                          <div>Theme</div>
                        </Grid>
                        <Grid item xs={12} sm={10} md={10}>
                          <Select
                            value={themeChange}
                            onChange={handleThemeChange}
                          >
                            <MenuItem value={"light"}>Light</MenuItem>
                            <MenuItem value={"dark"}>Dark</MenuItem>
                            <MenuItem value={"alliance"}>Alliance</MenuItem>
                            <MenuItem value={"horde"}>Horde</MenuItem>
                            <MenuItem value={"battlenet"}>Battle.Net</MenuItem>
                          </Select>
                        </Grid>
                      </Grid>
                    </FormControl>
                    <Button>Update</Button>
                    <Button>Cancel</Button>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Settings;
