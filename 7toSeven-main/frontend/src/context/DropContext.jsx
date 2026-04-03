import React, { createContext, useContext, useState } from 'react';

const DropContext = createContext();

export function DropProvider({ children }) {
  // Hardcoded for now. In production, this would be tied to a backend drop state.
  const [isDropLocked, setIsDropLocked] = useState(true);
  
  // Initialize from sessionStorage to prevent relocking on refresh
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem('7toSeven_unlocked') === 'true';
  });

  const unlockDrop = (password) => {
    if (!password) return false;
    if (password.toUpperCase() === '7TOSEVEN') {
      sessionStorage.setItem('7toSeven_unlocked', 'true');
      setIsUnlocked(true);
      return true;
    }
    return false;
  };

  return (
    <DropContext.Provider value={{ isDropLocked, isUnlocked, unlockDrop }}>
      {children}
    </DropContext.Provider>
  );
}

export const useDrop = () => {
  const context = useContext(DropContext);
  if (!context) {
    throw new Error('useDrop must be used within a DropProvider');
  }
  return context;
};
