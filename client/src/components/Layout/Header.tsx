import { AppBar, Box, List, ListItem, Switch, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import User from '../User/User';

const rightLinks = [
  {title: 'login', path: '/login'},
  {title: 'register', path: '/register'},
];

interface Props {
  darkMode: boolean;
  handleThemeToggle: () => void;
}

const navStyles = {
  color: 'inherit',
  textDecoration: 'none', 
  typography: 'h6',
  '&:hover': {
    color: 'grey.500'
  },
  '&.active': {
    color: 'text.secondary'
  },
  fontFamily: 'Poppins'
};

const Header = ({darkMode, handleThemeToggle}: Props) => {
  return (
    <AppBar position='static' sx={{mb: 3}}>
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Box display='flex' alignItems='center'>
          <Typography 
            variant='h6' 
            component={NavLink} 
            to='/' 
            sx={navStyles}
          >WoW Tracker Board</Typography>
          <Switch checked={darkMode} onChange={handleThemeToggle}/>
        </Box>
        
        <User />


        <Box display='flex' alignItems='center'>
          <List sx={{display: 'flex'}}>

          <SearchBar />
          
            {rightLinks.map(({title, path}) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={navStyles}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;