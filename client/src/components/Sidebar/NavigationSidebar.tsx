import { 
  Box,   
  Toolbar, 
  Drawer, 
  Divider, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText 
} from "@mui/material";

import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';

const NavigationSidebar = () => {
  const drawerWidth = 240;
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          top: '4.45rem',
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
        <Toolbar />
        <List>
          {['Dashboard', 'My Character', 'My Guild', 'My Progress'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
};

export default NavigationSidebar;