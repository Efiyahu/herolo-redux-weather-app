import React, { createContext, useState } from 'react';

const TempContext = createContext();

export const TempContextProvider = ({ children }) => {
  const [temp, setTemp] = useState(false);

  return (
    <TempContext.Provider value={{ temp, setTemp }}>
      {children}
    </TempContext.Provider>
  );
};

export default TempContext;
