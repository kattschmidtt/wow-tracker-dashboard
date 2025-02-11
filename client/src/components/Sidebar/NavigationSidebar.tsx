import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Tooltip,
  styled,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import SportsHandballOutlinedIcon from "@mui/icons-material/SportsHandballOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { NavLink } from "react-router-dom";
import { StyledNavLink } from "../Generics/StyledNavLink";

const icons = {
  SettingsOutlinedIcon,
  AppsOutlinedIcon,
  SportsHandballOutlinedIcon,
  Groups2OutlinedIcon,
  AccessTimeOutlinedIcon,
  CalendarMonthIcon,
};

interface SideBarItem {
  id: number;
  name: string;
  path: string;
  icon: keyof typeof icons;
  tooltip: string;
}

const NavigationSidebar = () => {
  const drawerWidth = 240;

  const sideLinks: SideBarItem[] = [
    {
      id: 1,
      name: "Dashboard",
      path: "/",
      icon: "AppsOutlinedIcon",
      tooltip: "Go to your dashboard",
    },
    {
      id: 2,
      name: "My Character",
      path: "/my-character",
      icon: "SportsHandballOutlinedIcon",
      tooltip: "Get specific character details",
    },
    {
      id: 3,
      name: "My Guild",
      path: "/my-guild",
      icon: "Groups2OutlinedIcon",
      tooltip: "Get specific guild details",
    },
    {
      id: 4,
      name: "My Progress",
      path: "/my-progress",
      icon: "AccessTimeOutlinedIcon",
      tooltip: "View all types of character progress",
    },
    {
      id: 5,
      name: "My Calendar",
      path: "/my-calendar",
      icon: "CalendarMonthIcon",
      tooltip: "Add, Edit, and View all important dates",
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Drawer
        sx={{
          textDecoration: "none",
          zIndex: 1,
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List sx={{ top: "4.45rem", textDecoration: "none" }}>
          {sideLinks.map((sidebarItem) => {
            const Icon = icons[sidebarItem.icon];
            return (
              <Tooltip
                key={sidebarItem.id}
                title={sidebarItem.tooltip}
                placement="right"
              >
                <ListItem
                  disablePadding
                  component={StyledNavLink}
                  to={sidebarItem.path}
                >
                  <ListItemButton key={sidebarItem.path}>
                    <ListItemIcon sx={{ color: "inherit" }}>
                      <Icon sx={{ color: "inherit" }} />
                    </ListItemIcon>
                    {sidebarItem.name}
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            );
          })}
        </List>

        <List sx={{ pt: "40rem", zIndex: "-1" }}>
          <Tooltip title="Account wide settings">
            <ListItem
              disablePadding
              component={StyledNavLink}
              to={"/settings"}
              sx={{ textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <SettingsOutlinedIcon />
                </ListItemIcon>
                Settings
              </ListItemButton>
            </ListItem>
          </Tooltip>
          <span style={{ fontSize: ".5rem" }}>
            *All pictures belong to Blizzard Entertainment*
          </span>
        </List>
      </Drawer>
    </Box>
  );
};

export default NavigationSidebar;
