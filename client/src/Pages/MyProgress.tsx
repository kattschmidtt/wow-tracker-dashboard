import { Box, Card, CardContent, Grid } from "@mui/material";
import Header from "../components/Layout/Header";
import NavigationSidebar from "../components/Sidebar/NavigationSidebar";

const MyProgress = () => {
  return (
    <>
      <Header />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <NavigationSidebar />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent></CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent></CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent></CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent></CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent></CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
export default MyProgress;

