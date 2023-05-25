import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

export function Home() {
  const { 
    apiKey, 
    isValidKey, 
  } = useContext(AuthContext);

  console.log(apiKey);
  
  const getCountries = async (apiKey) => {
    const response = await axios.get('https://v3.football.api-sports.io/countries', {
        headers: {
          'x-apisports-key': apiKey
        }
      });

      console.log(response);
      const countries = response;
  }

  return (
    <div>
      <button onClick={() => getCountries(apiKey)}>Fetch Data</button>
    </div>
  );
}