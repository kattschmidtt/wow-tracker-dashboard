import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import {
  lightTheme,
  darkTheme,
  allianceTheme,
  hordeTheme,
  battlenetTheme,
} from "../theme/theme.tsx";

type ThemeNames = "light" | "dark" | "alliance" | "horde" | "battlenet";

type ThemeContextType = {
  themeName: ThemeNames;
  setTheme: (name: ThemeNames) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeName, setThemeName] = useState<ThemeNames>(() => {
    const savedTheme = sessionStorage.getItem("theme") as ThemeNames | null;
    return savedTheme || "dark";
  });

  const themes = {
    light: lightTheme,
    dark: darkTheme,
    alliance: allianceTheme,
    horde: hordeTheme,
    battlenet: battlenetTheme,
  };

  const setTheme = (name: ThemeNames) => {
    setThemeName(name);
    sessionStorage.setItem("theme", name);
  };

  useEffect(() => {
    const savedTheme = sessionStorage.getItem("theme") as ThemeNames | null;
    if (savedTheme) setThemeName(savedTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ themeName, setTheme }}>
      <MuiThemeProvider theme={themes[themeName]}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
