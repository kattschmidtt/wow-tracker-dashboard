import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/Routes.tsx'
import { UserProvider } from './context/userContext.tsx'
import { AffixProvider } from './context/RaiderIoContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
    <AffixProvider>
      <RouterProvider router={router} />
    </AffixProvider>
    </UserProvider>
  </React.StrictMode>,
)
