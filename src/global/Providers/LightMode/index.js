import React, { createContext, useState } from 'react';

export const LightModeContext = createContext();

export function LightModeProvider({ children }) {
  const [lightMode, setLightMode] = useState(false);

  function handleLightMode() {
    setLightMode(lightMode => !lightMode);
  }

  const value = {
    handleLightMode,
    lightMode
  };

  return (
    <LightModeContext.Provider value={{ ...value }}>
      {children}
    </LightModeContext.Provider>
  );
}
