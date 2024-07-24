import { Box, Grid } from '@mui/material';
import React from 'react';
import Header from '../components/Layout/Header';
import NavigationSidebar from '../components/Sidebar/NavigationSidebar';

const SearchResults = () => {
  return (
    <>
    <Header />
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2} md={2}>
              <NavigationSidebar />
            </Grid>
searchy search
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default SearchResults;