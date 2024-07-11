import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../components/Layout/App';
import Home from '../Pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {path: '', element: <Home /> },
    ]
  }
])