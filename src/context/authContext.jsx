import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState('');
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
