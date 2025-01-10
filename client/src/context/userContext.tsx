// userContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

interface UserContextType {
  token: string | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserContextProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/auth/redirect', {
        method: 'GET',
        headers: {"Access-Control-Allow-Origin": "*"}
      });
    /*   const accessToken = response.data.access_token;
      setToken(accessToken);
      localStorage.setItem('bearer_token', accessToken);
      setIsLoggedIn(!isLoggedIn) */

      console.log(response)
      setIsLoggedIn(true)
        
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  }; 

  const logout = () => {
    setToken(null);
    localStorage.removeItem('bearer_token');
  };

  return (
    <UserContext.Provider value={{ token, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};
