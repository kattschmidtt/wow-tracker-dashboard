import React, { createContext, useState, useContext, ReactNode } from "react";

interface UserContextType {
  token: string | null;
  isLoggedIn: boolean;
  userData: object | null;
  login: () => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserContextProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<object | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = async () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setToken(null);
    setUserData(null);
    setIsLoggedIn(false);
    localStorage.removeItem("bearer_token");
  };

  return (
    <UserContext.Provider value={{ token, isLoggedIn, userData, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
