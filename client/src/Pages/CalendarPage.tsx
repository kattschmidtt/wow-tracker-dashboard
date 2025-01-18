import { Box, Grid } from '@mui/material';
import Header from '../components/Layout/Header';
import NavigationSidebar from '../components/Sidebar/NavigationSidebar';
import MythicPlusTracking from '../components/MythicPlusTracking/MythicPlusTracking';
import MythicPlusTrackingStats from '../components/MythicPlusTracking/MythicPlusTrackingStats';
import BigCalendar from '../components/Calendar/BigCalendar';

const CalendarPage = () => {
  return (
    <>
      <Header />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {/* Sidebar */}
        <Box sx={{ width: '16%', minWidth: 200 }}>
          <NavigationSidebar />
        </Box>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Other Components */}
          <Grid container spacing={2} sx={{ padding: '2rem' }}>
            <Grid item xs={12}>
              <p>test1</p>
            </Grid>

            <Grid item xs={12} sx={{ flexGrow: 1 }}>
              <BigCalendar />
            </Grid>

            <Grid item xs={12}>
              <p>test3</p>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default CalendarPage;