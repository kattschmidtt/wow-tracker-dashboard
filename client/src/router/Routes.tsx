import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../components/Layout/App';
import Home from '../Pages/Home';
import Login from '../Pages/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {path: '', element: <Home /> },
      {path: '/login', element: <Login /> },
    ]
  }
])