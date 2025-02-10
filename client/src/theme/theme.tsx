import { createTheme } from "@mui/material/styles";

// Light theme
export const lightTheme = createTheme({
  palette: {
    mode: "light", // Default mode
    primary: {
      main: "#1976d2", // Customize primary color
    },
    secondary: {
      main: "#9c27b0", // Customize secondary color
    },
    background: {
      default: "#f5f5f5", // Light background
      paper: "#ffffff", // Light paper color
    },
    text: {
      primary: "#000000", // Dark text for light theme
      secondary: "#757575", // Secondary text color
    },
  },
});

// Dark theme
export const darkTheme = createTheme({
  palette: {
    mode: "dark", // Dark mode
    primary: {
      main: "#90caf9", // Customize primary color for dark theme
    },
    secondary: {
      main: "#ce93d8", // Customize secondary color for dark theme
    },
    background: {
      default: "#121212", // Dark background
      paper: "#1e1e1e", // Dark paper color
    },
    text: {
      primary: "#ffffff", // Light text for dark theme
      secondary: "#b3b3b3", // Secondary text color
    },
  },
});

// Horde theme
export const hordeTheme = createTheme({
  palette: {
    mode: "horde",
    primary: {
      main: "#c8785c",
    },
    secondary: {
      main: "#906e4a",
    },
    background: {
      default: "#d8d1ca",
      paper: "#906e4a",
    },
    text: {
      primary: "#c12b12",
      secondary: "#c8785c",
    },
  },
});

// Alliance theme
export const allianceTheme = createTheme({
  palette: {
    mode: "alliance",
    primary: {
      main: "#14244a",
    },
    secondary: {
      main: "#dbbe2a",
    },
    background: {
      default: "#d8d1ca",
      paper: "#4a2e4f",
    },
    text: {
      primary: "#ffffff",
      secondary: "#dbbe2a",
    },
  },
});

// Battle net theme
export const battlenetTheme = createTheme({
  palette: {
    mode: "battlenet",
    primary: {
      main: "#1e71e7",
    },
    secondary: {
      main: "#d9ac25",
    },
    background: {
      default: "#3b3b3b",
      paper: "#071f2d",
    },
    text: {
      primary: "#ffffff",
      secondary: "#3b3b3b",
    },
  },
});
