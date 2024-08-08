import { Container, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import '../../App.css'

const App = () => {

  const [darkMode, setDarkMode] = useState(false)
  const paletteType = darkMode ? 'dark' : 'light'

  return (
    <>
      <ToastContainer position="bottom-right" theme="colored"/>
      <CssBaseline />
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          minHeight: '100vh',
          display: 'flex', 
          flexDirection: 'column',
          padding: 0,
          margin: 0,
        }}
      >
          <Outlet />
      </Container>
    </>
  )
}

export default App;
