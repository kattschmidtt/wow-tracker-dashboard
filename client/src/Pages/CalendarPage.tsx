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
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2} md={2}>
              <NavigationSidebar />
            </Grid>

            {/* Middle of home page, sandwhiched inbetween the nav bar and calendar */}
            <Grid item xs={12} sm={8} md={8}>
              {/* Character Card container */}
              <Grid container spacing={2} sx={{pt: '5rem', pb: '2rem'}}>
                <p>test1</p>
              </Grid>

              {/* M+ Charts for nerds (me) */}
              <Grid container spacing={2} sx={{pb: '2rem'}}>
                <Grid item xs={8} sm={4} md={6}>
                  <BigCalendar />
                </Grid>
              </Grid>

              {/* Guild Prog or M+ Leaderboard */}
              <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                  <p>test3</p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default CalendarPage;