// context/UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [datosUsuario, setDatosUsuario] = useState({});

  return (
    <UserContext.Provider value={{ datosUsuario, setDatosUsuario }}>
      {children}
    </UserContext.Provider>
  );
};
