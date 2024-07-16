import { 
  Box,   
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
} from "@mui/material";
import Icon from '@mui/material/Icon';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import SportsHandballOutlinedIcon from '@mui/icons-material/SportsHandballOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

const icons = {
  SettingsOutlinedIcon,
  AppsOutlinedIcon,
  SportsHandballOutlinedIcon,
  Groups2OutlinedIcon, 
  AccessTimeOutlinedIcon
};

import { NavLink } from "react-router-dom";

interface SideBarItem {
  id: number;
  name: string;
  path: string
  icon: keyof typeof icons;
}

const NavigationSidebar = () => {
  const drawerWidth = 240;

  const sideLinks: SideBarItem[] = [
    {
      id: 1, 
      name: "Dashboard",
      path: '/',
      icon: 'AppsOutlinedIcon'
    },
    {
      id: 2, 
      name: "My Character",
      path: '/my-character',
      icon: 'SportsHandballOutlinedIcon'
    },
    {
      id: 3, 
      name: "My Guild",
      path: '/my-guild',
      icon: 'Groups2OutlinedIcon'
    },
    {
      id: 4, 
      name: "My Progress",
      path: '/my-progress',
      icon: 'AccessTimeOutlinedIcon'
    },

  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            top: '4.45rem'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          {sideLinks.map(sidebarItem => {
            const Icon = icons[sidebarItem.icon]
            return (
              <ListItem disablePadding component={NavLink} to={sidebarItem.path} sx={{textDecoration: 'none', color: 'black'}}>
                <ListItemButton key={sidebarItem.path}>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  {sidebarItem.name}
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>

        <List sx={{ pt: '41rem' }}>
          <ListItem 
            disablePadding 
            component={NavLink} 
            to={'/settings'} 
            sx={{textDecoration: 'none', color: 'black'}}>    
            <ListItemButton>
              <ListItemIcon>
                <SettingsOutlinedIcon />
              </ListItemIcon>
              Settings
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default NavigationSidebar;