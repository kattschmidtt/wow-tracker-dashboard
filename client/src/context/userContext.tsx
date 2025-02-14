import React, { createContext, useState, useContext, ReactNode } from "react";
import { BattlenetUserModel } from "../Models/userModel";

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
  const [userData, setUserData] = useState<BattlenetUserModel | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = async () => {
    try {
      const resp = await fetch("http://localhost:8080/battlenet_login");
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
      const respJson = await resp.json();
      setUserData(respJson);
      setIsLoggedIn(true);

      window.location.href = "http://localhost:3000/";
    } catch (err) {
      console.log(
        "this is an error from the login function in userProvider: ",
        err,
      );
    }
  };

  const logout = () => {
    setToken(null);
    setUserData(null);
    setIsLoggedIn(false);
    localStorage.removeItem("bearer_token");
  };

  return (
    <UserContext.Provider
      value={{ token, isLoggedIn, userData, login, logout }}
    >
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
