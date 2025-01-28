import { useContext } from 'react';
import Header from '../components/Layout/Header';
import { Box, Card, CardContent, Grid, Paper } from '@mui/material';
import NavigationSidebar from '../components/Sidebar/NavigationSidebar';
import { GuildContext } from '../context/GuildContext';
import BossKillProgress from '../components/Guild/BossKillProgress';
import Members from '../components/Guild/Members';
import Rankings from '../components/Guild/Rankings';

const MyGuild = () => {

  const { isLoading } = useContext(GuildContext);

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
                  <Grid container spacing={2} sx={{ pb: '2rem' }}>
                    {/* background is battle net black for now so we can see priest names */}
                    {/* Left component */}
                    <Grid item xs={12} sm={6} md={6}>
                      <Paper sx={{ width: '100%', mb: 2, pt: '1rem', bgcolor: '#191B21', display: 'flex', justifyContent: 'center' }}>
                        {isLoading ? (<>test it loading</>) : (<Members />)}
                      </Paper>
                    </Grid>

                    {/* Left component */}
                    <Grid item xs={12} sm={6} md={6}>
                      <Paper sx={{ width: '100%', mb: 2, pt: '1rem' }}>
                        {isLoading ? (<>test it loading</>) : (<Rankings />)}
                      </Paper>
                    </Grid>
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
