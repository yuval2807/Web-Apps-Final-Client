import React, { createContext, useState, useCallback } from "react";

export interface CurrentIndex {
  selectedIndex: number;
}

interface NavContextType {
  currentIndex: CurrentIndex | null;
  updateCurrentIndex: (user: CurrentIndex) => void;
  resetCurrentIndex: () => void;
}

const defaultContextValue: NavContextType = {
  currentIndex: { selectedIndex: 0 },
  updateCurrentIndex: () => {},
  resetCurrentIndex: () => {},
};
export const NavContext = createContext<NavContextType>(defaultContextValue);

interface NavProviderProps {
  children: React.ReactNode;
}

export const NavProvider: React.FC<NavProviderProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState<CurrentIndex | null>({ selectedIndex: 0 });

  const updateCurrentIndex = useCallback((index: CurrentIndex) => {
    setCurrentIndex(index);
  }, []);

  const resetCurrentIndex = useCallback(() => {
    setCurrentIndex(null);
  }, []);

  const value = {
    currentIndex,
    updateCurrentIndex,
    resetCurrentIndex,
  };

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
};
