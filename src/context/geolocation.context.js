import React, { useState, createContext } from 'react';

const GeolocationContext = createContext();

export const GeolocationContextProvider = ({ children }) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [geolocation, setGeolocation] = useState({
    lat: '',
    lng: '',
  });

  return (
    <GeolocationContext.Provider
      value={{ geolocation, setGeolocation, initialLoad, setInitialLoad }}
    >
      {children}
    </GeolocationContext.Provider>
  );
};

export default GeolocationContext;
