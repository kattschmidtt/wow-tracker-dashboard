import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/Routes.tsx'
import { UserProvider } from './context/userContext.tsx'
import { AffixProvider } from './context/AffixContext.tsx'
import { LeaderboardProvider } from './context/LeaderboardContext.tsx'
import { GuildProgProvider } from './context/GuildContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
    <AffixProvider>
    <LeaderboardProvider>
    <GuildProgProvider>
      <RouterProvider router={router} />
    </GuildProgProvider>
    </LeaderboardProvider>
    </AffixProvider>
    </UserProvider>
  </React.StrictMode>,
)
