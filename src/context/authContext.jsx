import React, { createContext, useState } from 'react';
import { useLocalStorage } from 'react-use';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [apiKey, setApiKey, apiKeyRemove] = useLocalStorage('apiKey');
  const [isValidKey, setIsValidKey] = useState(null);
  const [localApiKey, setLocalApiKey] = useState("");
  const [countries, setCountries] = useState([]);

  const getCountries = async (apiKey) => {
    const response = await axios.get('https://v3.football.api-sports.io/countries', {
      headers: {
        'x-apisports-key': apiKey
      }
    });

    const countries = response.data.response;

    setCountries(countries);
    setFilteredCountries(countries);
  };

  return (
    <AuthContext.Provider value={{ 
      apiKey, 
      setApiKey,
      isValidKey, 
      setIsValidKey,
      localApiKey, 
      setLocalApiKey,
      getCountries,
      countries
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
