import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

export function Home() {
  const { 
    apiKey, 
    isValidKey, 
  } = useContext(AuthContext);

  const getCountries = async () => {
    try {
      const response = await axios.get('https://v3.football.api-sports.io/coutries', {
        headers: {
          'x-apisports-key': apiKey
        }
      });

      // Resto do código
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return isValidKey && (
    <div>
      <button onClick={getCountries}>Fetch Data</button>
    </div>
  );
}