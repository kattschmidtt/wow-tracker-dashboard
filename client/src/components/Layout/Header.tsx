import {
  AppBar,
  Box,
  Button,
  List,
  ListItem,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import User from "../User/User";
import { useUserContext } from "../../context/userContext";
import Avatar from "boring-avatars";
import { useTheme } from "../../context/ThemeContext";
import React, { useState } from "react";

const userDropdown = [
  { title: "Settings", path: "/settings" },
  { title: "Logout", path: "/logout" },
];

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  fontFamily: "Poppins",
};

const Header = () => {
  const { isLoggedIn, logout } = useUserContext();
  //const [isLoggedIn, setIsLoggedIn ] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(localStorage.getItem("battletag"));

  const handleLogout = () => {
    logout();
    setTimeout(() => {
      window.location.href = "http://localhost:3000/login";
    }, 500);
  };

  return (
    <AppBar position="fixed" sx={{ mb: 3, boxShadow: "none" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography component={NavLink} to="/" sx={navStyles}>
            WoW Tracker Board
          </Typography>
        </Box>

        <User />

        <Box display="flex" alignItems="center">
          <List sx={{ display: "flex" }}>
            <SearchBar />
            {isLoggedIn ? (
              <>
                <Button onClick={handleClick}>
                  <Avatar variant="beam" />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem
                    key="settings"
                    component={NavLink}
                    to="/settings"
                    onClick={handleClose}
                  >
                    Settings
                  </MenuItem>
                  <MenuItem
                    key="logout"
                    component={NavLink}
                    to="/logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <ListItem
                component={NavLink}
                to={"/login"}
                key={"/login"}
                sx={navStyles}
              >
                Login
              </ListItem>
            )}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
