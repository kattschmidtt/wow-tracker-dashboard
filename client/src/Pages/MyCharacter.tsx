import { Box, Grid } from '@mui/material';
import NavigationSidebar from '../components/Sidebar/NavigationSidebar';
import Header from '../components/Layout/Header';
import { useEffect } from 'react';

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