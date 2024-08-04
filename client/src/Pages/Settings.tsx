import Header from '../components/Layout/Header';
import { Box, Button, Card, CardContent, FormControl, Grid, Input, Slider, Typography } from '@mui/material';
import Avatar from 'boring-avatars';
import NavigationSidebar from '../components/Sidebar/NavigationSidebar';

const Settings = () => {
  return (
    <>
      <Header />
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2} md={2}>
              <NavigationSidebar />
            </Grid>

            <Grid item xs={12} sm={8} md={8}>
              <Box
                component='form'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  pt: '5rem',
                  pb: '2rem'
                }}>
                <Card>
                  <CardContent>
                    {/* default, will have user's Battle.net account name */}
                    <Avatar
                      size={40}
                      name="Foxx"
                      variant="marble"
                      colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
                    />
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={2} md={2}>
                          <Typography>Username</Typography>
                        </Grid>
                        <Grid item xs={12} sm={10} md={10}>
                          <Input />
                        </Grid>
                        <Grid item xs={12} sm={2} md={2}>
                          <Typography>Password</Typography>
                        </Grid>
                        <Grid item xs={12} sm={10} md={10}>
                          <Input type='password' />
                        </Grid>
                        <Grid item xs={12} sm={2} md={2}>
                          <Typography>Font Size</Typography>
                        </Grid>
                       
                      </Grid>
                    </FormControl>
                    <Button>Update</Button>
                    <Button>Cancel</Button>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Settings;
