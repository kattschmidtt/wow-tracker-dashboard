import { ThemeProvider } from '@emotion/react';
import { Container, createTheme, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Header from './Header';

import '../../App.css'

const App = () => {

  const [darkMode, setDarkMode] = useState(false)
  const paletteType = darkMode ? 'dark' : 'light'

  const theme = createTheme({
    palette: {
      primary: {
        main: '#00e676',
      },
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#a1dce6' //retain original darkMode bg color
      },
      text: {
        secondary: paletteType === 'light' ? '#eaeaea' : '#a1dce6' 
      },
    },
    
  })

  const handleThemeToggle = () => setDarkMode(!darkMode)

  return (
    <ThemeProvider theme={theme}>
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
        <Header darkMode={darkMode} handleThemeToggle={handleThemeToggle} />
          <Outlet />
      </Container>
    </ThemeProvider>
  )
}

export default App;
