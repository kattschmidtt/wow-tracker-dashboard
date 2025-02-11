import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

export const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  "&.active": {
    color: theme.palette.text.secondary,
    fontWeight: "bold",
  },
  "& .MuiListItemIcon-root": {
    color: "inherit",
  },
}));
