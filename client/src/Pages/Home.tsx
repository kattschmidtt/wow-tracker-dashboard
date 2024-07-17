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

const Home = () => {

  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    setCurrentTime(getCurrentISODate())
    prettyDate()
  }, [])

  //amount of characters in favorite list (random WoW streamers I watch)
  //will switch to user context when backend is finished
  const charList = [
    {
      name: 'foxx',
      isFavorite: true
    },
    {
      name: 'maximum',
      isFavorite: false
    },
    {
      name: 'dorki',
      isFavorite: false
    },
    {
      name: 'eiya',
      isFavorite: false
    },
    {
      name: 'yummmy',
      isFavorite: false
    },
    {
      name: 'meeix',
      isFavorite: false
    }
  ]

  return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2} md={2}>
              <NavigationSidebar />
            </Grid>

            {/* Middle of home page, sandwhiched inbetween the nav bar and calendar */}
            <Grid item xs={12} sm={8} md={8}>
              {/* Character Card container */}
              <Grid container spacing={2} sx={{pt: '1rem', pb: '2rem'}}>
                {charList.map((item, idx) => (
                  <Grid item key={idx} xs={12} sm={4} md={4}>
                    <CharacterCard charId={idx} favorite={item.isFavorite} name={item.name} />
                  </Grid>
                ))}
              </Grid>

              {/* M+ Charts for nerds (me) */}
              <Grid container spacing={2} sx={{pb: '2rem'}}>
                <Grid item xs={8} sm={6} md={6}>
                  <MythicPlusTrackingStats />
                </Grid>
                {/* M+ Tracking */}
                <Grid item xs={8} sm={6} md={6}>
                  <MythicPlusTracking />
                </Grid>
              </Grid>

              {/* Guild Prog or M+ Leaderboard */}
              <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                  <Leaderboard />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={2} md={2} sx={{pr: '2rem'}}>
              <MiniCalendar />
            </Grid>
          </Grid>
        </Box>
      </div>
  );
};
export default Home;