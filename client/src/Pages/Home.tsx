import { useContext, useEffect, useState } from 'react';
import MiniCalendar from '../components/Calendar/MiniCalendar';
import {getCurrentISODate, prettyDate} from '../util/util';
import { UserContext } from '../context/userContext';
import CharacterCard from '../components/CharacterSelect/CharacterCard';
import { Box, Grid } from '@mui/material';
import NavigationSidebar from '../components/Sidebar/NavigationSidebar';

const Home = () => {

  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    setCurrentTime(getCurrentISODate())
    prettyDate()
  }, [])

  //amount of characters in favorite list (random WoW streamers I watch)
  const charList = [
    'foxx',
    'maximum',
    'dorki',
    'eiya',
    'yummmy',
    'meeix'
  ]

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2} md={2}>
            <NavigationSidebar />
          </Grid>
          <Grid item xs={12} sm={8} md={8}>
            <Grid container spacing={2}>
              {charList.map((name, idx) => (
                <Grid item key={idx} xs={12} sm={4} md={4}>
                  <CharacterCard charId={idx} name={name} />
                </Grid>
              ))}
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