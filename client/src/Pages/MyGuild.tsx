import React, { useContext, useState } from 'react';
import Header from '../components/Layout/Header';
import { Box, Card, CardContent, CircularProgress, Grid, Paper } from '@mui/material';
import NavigationSidebar from '../components/Sidebar/NavigationSidebar';
import GuildLeaderboard from '../components/Leaderboard/GuildLeaderboard';
import { GuildContext } from '../context/GuildContext';
import BossKillProgress from '../components/Guild/BossKillProgress';

const MyGuild = () => {

  const { isLoading } = useContext(GuildContext);


  const widgetUrl =
    `https://raider.io/widgets/health-over-attempt?raid=latest&type=attempt&period=until_kill&difficulty=mythic&guilds=us%2Fproudmoore%2FAcrimonious&boss=latest`;
const w = 'hi'
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
          <Grid container spacing={2} sx={{ padding: '6rem' }}>
            
            <Grid item xs={12}>
              <h2>Acrimonious - Proudmoore</h2>
            </Grid>

            {/* Top Container */}
            <Grid item xs={12} sx={{ flexGrow: 1 }}>
              <Card>
                <CardContent>
                  <Box sx={{ width: '100%' }}>
                    <Grid container spacing={2} sx={{pb: '2rem'}}>
                      <Paper sx={{ width: '50%', mb: 2, pt: '1rem' }}>
                        <Grid item xs={8} sm={4} md={6}>
                          {isLoading ? (<>test it loaded</>) : (<>no load</>)}
                        </Grid>
                        {/* M+ Tracking */}
                      </Paper>
                      <Paper sx={{ width: '50%', mb: 2, pt: '1rem' }}>
                        <Grid item xs={8} sm={4} md={6}>
                          <span></span>
                        </Grid>
                        {/* M+ Tracking */}
                      </Paper>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Bottom Container */}
            <Grid item xs={12} sx={{ flexGrow: 1 }}>
              <Card>
                <CardContent>
                  <CardContent>
                    {/* <iframe
                      src={widgetUrl}
                      title="Raider.IO Widget"
                      style={{
                        width: '100%',
                        height: '600px',
                        border: 'none',
                        overflow: 'hidden',
                      }}
                      loading="lazy"
                    /> */}
                    <BossKillProgress />
                  </CardContent>
                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default MyGuild;