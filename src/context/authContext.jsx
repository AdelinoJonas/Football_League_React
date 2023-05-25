import React, { createContext, useState } from 'react';
import { useLocalStorage } from 'react-use';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [apiKey, setApiKey, apiKeyRemove] = useLocalStorage('apiKey');
  const [isValidKey, setIsValidKey] = useState(null);
  const [localApiKey, setLocalApiKey] = useState("");

  return (
    <AuthContext.Provider value={{ 
      apiKey, 
      setApiKey,
      isValidKey, 
      setIsValidKey,
      localApiKey, 
      setLocalApiKey
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
