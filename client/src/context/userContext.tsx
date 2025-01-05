import React, { createContext, useState, useContext, ReactNode } from 'react';

interface UserProviderProps {
  children: ReactNode;
}

interface UserModel {
  id: number;
  name: string;
  pictureUrl: string;
  currentDateTime: string;
  battletag?: string;
}

interface UserContextProps {
  user: UserModel | null;
  isLoggedIn: boolean;
  fetchUserProfile: () => void;
}

//initial user state
const UserContext = createContext<UserContextProps>({
  user: null,
  isLoggedIn: false,
  fetchUserProfile: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    window.location.href = 'http://localhost:8080/login'; //redirect to login route
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:8080/profile/user/wow', {
        credentials: 'include', //cookies for auth
      });
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUser(data);
        setIsLoggedIn(true);
      } else {
        console.error('Failed to fetch user profile:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, fetchUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
