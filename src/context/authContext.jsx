import React, { createContext, useState } from 'react';
import { useLocalStorage } from 'react-use';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [apiKey, setApiKey] = useLocalStorage('apiKey');
  const [isValidKey, setIsValidKey] = useState(null);

  return (
    <AuthContext.Provider value={{ 
      apiKey, 
      setApiKey,
      isValidKey, 
      setIsValidKey
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
