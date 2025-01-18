import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../components/Layout/App';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import MyCharacter from '../Pages/MyCharacter';
import MyGuild from '../Pages/MyGuild';
import MyProgress from '../Pages/MyProgress';
import SearchResults from '../Pages/SearchResults';
import CalendarPage from '../Pages/CalendarPage';
import Settings from '../Pages/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {path: '', element: <Home /> },
      {path: '/login', element: <Login /> },
      {path: '/logout', element: <Login /> },
      {path: '/my-character', element: <MyCharacter /> },
      {path: '/my-guild', element: <MyGuild /> },
      {path: '/my-progress', element: <MyProgress /> },
      {path: '/my-calendar', element: <CalendarPage /> },
      {path: '/search', element: <SearchResults /> },
      {path: '/settings', element: <Settings /> },
    ]
  }
])