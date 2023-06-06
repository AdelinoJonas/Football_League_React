import React, { createContext, useState } from 'react';
import { useLocalStorage } from 'react-use';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [apiKey, setApiKey, apiKeyRemove] = useLocalStorage('apiKey');
  const [isValidKey, setIsValidKey] = useState(null);
  const [localApiKey, setLocalApiKey] = useState("");
  
  const [showDropdown, setShowDropdown] = useState(false);

  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  
  const [leagues, setLeagues] = useState([]);
  const [filteredLeagues, setFilteredLeagues] = useState([]);




  const getCountries = async () => {
    const response = await axios.get('https://v3.football.api-sports.io/countries', {
      headers: {
        'x-apisports-key': apiKey
      }
    });

    const countries = response.data.response;
    setCountries(countries);
    setFilteredCountries(countries);
  };

  const getLeagues = async () => {
    const response = await axios.get('https://v3.football.api-sports.io/leagues', {
      headers: {
        'x-apisports-key': apiKey
      }
    });
    console.log(response);

    const leagues = response.data.response;
    console.log(leagues);
    setLeagues(leagues);
    setFilteredLeagues(leagues);
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
      countries, 
      filteredCountries, 
      setFilteredCountries,
      showDropdown, 
      setShowDropdown,
      getLeagues,
      leagues, 
      setLeagues,
      filteredLeagues, 
      setFilteredLeagues,
      selectedCountry, 
      setSelectedCountry
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};