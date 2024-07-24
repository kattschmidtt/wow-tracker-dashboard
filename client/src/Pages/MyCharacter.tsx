import { useContext, useEffect, useState } from 'react';
import MiniCalendar from '../components/Calendar/MiniCalendar';
import {getCurrentISODate, prettyDate} from '../util/util';
import { UserContext } from '../context/userContext';
import CharacterCard from '../components/CharacterSelect/CharacterCard';
import { Box, Grid } from '@mui/material';
import NavigationSidebar from '../components/Sidebar/NavigationSidebar';
import MythicPlusTrackingStats from '../components/MythicPlusTracking/MythicPlusTrackingStats';
import MythicPlusTracking from '../components/MythicPlusTracking/MythicPlusTracking';
import Leaderboard from '../components/Leaderboard/Leaderboard';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const MyCharacter = () => {

  return (
    <>
    <Header />
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2} md={2}>
              <NavigationSidebar />
            </Grid>

          </Grid>
        </Box>
      </div>
    </>
  );
};
export default MyCharacter;