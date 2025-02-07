import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Routes.tsx";
import { AffixProvider } from "./context/AffixContext.tsx";
import { LeaderboardProvider } from "./context/LeaderboardContext.tsx";
import { GuildProgProvider } from "./context/GuildContext.tsx";
import { CharacterProvider } from "./context/CharacterContext.tsx";
import { UserProvider } from "./context/userContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <AffixProvider>
          <LeaderboardProvider>
            <GuildProgProvider>
              <CharacterProvider>
                <RouterProvider router={router} />
              </CharacterProvider>
            </GuildProgProvider>
          </LeaderboardProvider>
        </AffixProvider>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
