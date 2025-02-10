import React, { createContext, useState, useCallback } from "react";

export interface ConnectedUser {
  id: string;
  name: string;
  email: string;
  tokens: string;
  accessToken: string;
  refreshToken: string;
}

interface UserContextType {
  connectedUser: ConnectedUser | null;
  updateConnectedUser: (user: ConnectedUser) => void;
  resetConnectedUser: () => void;
  isAuthenticated: boolean;
}

const defaultContextValue: UserContextType = {
  connectedUser: null,
  updateConnectedUser: () => {},
  resetConnectedUser: () => {},
  isAuthenticated: false,
};
export const UserContext = createContext<UserContextType>(defaultContextValue);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [connectedUser, setConnectedUser] = useState<ConnectedUser | null>(
    () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        localStorage.setItem("accessToken", JSON.parse(storedUser).accessToken);
        localStorage.setItem(
          "refreshToken",
          JSON.parse(storedUser).refreshToken
        );
        return JSON.parse(storedUser);
      }
      return null;
    }
  );

  const updateConnectedUser = useCallback((user: ConnectedUser) => {
    setConnectedUser(user);
    localStorage.setItem("accessToken", user.accessToken);
    localStorage.setItem("refreshToken", user.refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
  }, []);

  const resetConnectedUser = useCallback(() => {
    setConnectedUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }, []);

  const value = {
    connectedUser,
    updateConnectedUser,
    resetConnectedUser,
    isAuthenticated: !!connectedUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
