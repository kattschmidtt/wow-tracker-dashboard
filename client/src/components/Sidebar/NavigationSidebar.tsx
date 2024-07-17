import { 
  Box,   
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon,
  Tooltip, 
} from "@mui/material";
import Icon from '@mui/material/Icon';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import SportsHandballOutlinedIcon from '@mui/icons-material/SportsHandballOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { NavLink } from "react-router-dom";

const icons = {
  SettingsOutlinedIcon,
  AppsOutlinedIcon,
  SportsHandballOutlinedIcon,
  Groups2OutlinedIcon, 
  AccessTimeOutlinedIcon
};

interface SideBarItem {
  id: number;
  name: string;
  path: string
  icon: keyof typeof icons;
  tooltip: string;
}

const NavigationSidebar = () => {
  const drawerWidth = 240;

  const sideLinks: SideBarItem[] = [
    {
      id: 1, 
      name: "Dashboard",
      path: '/',
      icon: 'AppsOutlinedIcon',
      tooltip: 'Go to your dashboard'
    },
    {
      id: 2, 
      name: "My Character",
      path: '/my-character',
      icon: 'SportsHandballOutlinedIcon',
      tooltip: 'Get specific character details'
    },
    {
      id: 3, 
      name: "My Guild",
      path: '/my-guild',
      icon: 'Groups2OutlinedIcon',
      tooltip: 'Get specific guild details'
    },
    {
      id: 4, 
      name: "My Progress",
      path: '/my-progress',
      icon: 'AccessTimeOutlinedIcon',
      tooltip: 'View all types of character progress'
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
              <Tooltip key={sidebarItem.id} title={sidebarItem.tooltip} placement="right">
                <ListItem disablePadding component={NavLink} to={sidebarItem.path} sx={{textDecoration: 'none', color: 'black'}}>
                  <ListItemButton key={sidebarItem.path}>
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    {sidebarItem.name}
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            )
          })}
        </List>

        <List sx={{ pt: '41rem' }}>
          <Tooltip title='Account wide settings'>
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
          </Tooltip>
        </List>
      </Drawer>
    </Box>
  );
};

export default NavigationSidebar;