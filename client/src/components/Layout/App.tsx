import { ThemeProvider } from '@emotion/react';
import { Container, createTheme, CssBaseline, Button } from '@mui/material';
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
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212' //retain original darkMode bg color
      }
    }
  })

  const handleThemeToggle = () => setDarkMode(!darkMode)

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" theme="colored"/>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeToggle={handleThemeToggle}/>
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}

export default App;
