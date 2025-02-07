import { Box, Grid } from "@mui/material";
import Header from "../components/Layout/Header";
import NavigationSidebar from "../components/Sidebar/NavigationSidebar";
import BigCalendar from "../components/Calendar/BigCalendar";
import { CalendarProvider } from "../context/CalendarContext";

const CalendarPage = () => {
  return (
    <CalendarProvider>
      <>
        <Header />
        <Box sx={{ display: "flex", height: "100vh" }}>
          {/* Sidebar */}
          <Box sx={{ width: "16%", minWidth: 200 }}>
            <NavigationSidebar />
          </Box>

          {/* Main Content */}
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
            {/* Other Components */}
            <Grid container spacing={2} sx={{ padding: "2rem" }}>
              <Grid item xs={12}>
                <br /> <br />
              </Grid>

              <Grid item xs={12} sx={{ flexGrow: 1 }}>
                <BigCalendar />
              </Grid>

              <Grid item xs={12}></Grid>
            </Grid>
          </Box>
        </Box>
      </>
    </CalendarProvider>
  );
};

export default CalendarPage;
