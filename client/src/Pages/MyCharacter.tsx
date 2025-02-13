import { Box, Card, CardContent, Grid } from '@mui/material';
import NavigationSidebar from '../components/Sidebar/NavigationSidebar';
import Header from '../components/Layout/Header';
import Character from '../components/Character/Character';
import Items from '../components/Character/Items';
import Stats from '../components/Character/Stats';
import Talents from '../components/Character/Talents';

const MyCharacter = () => {

  return (
    <>
    <Header />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <NavigationSidebar />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Items side='left'/>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Character />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Items side='right'/>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Stats />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Talents />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        
      </Box>
    </>
  );
};
export default MyCharacter;

