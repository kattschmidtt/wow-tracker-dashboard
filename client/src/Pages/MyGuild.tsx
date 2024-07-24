import React from 'react';
import Header from '../components/Layout/Header';
import { Box, Grid } from '@mui/material';
import NavigationSidebar from '../components/Sidebar/NavigationSidebar';

const MyGuild = () => {
  return (
    <>
    <Header />
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2} md={2}>
              <NavigationSidebar />
            </Grid>
          poopoo
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default MyGuild;