import React, { useState } from 'react';
import axios from 'axios';

export function Login() {
  const [apiKey, setApiKey] = useState('');
  const [isValidKey, setIsValidKey] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('https://v3.football.api-sports.io/status', {
        headers: {
          'x-apisports-key': apiKey
        }
      });
      
      console.log(response.data.response);
      console.log(response.data.response.subscription.active);
      const { active } = response.data.response.subscription;

      if (response.data.response) {
        alert("Pode iniciar escolhendo um país")
      } else {
        setIsValidKey(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="">Welcome to My Team</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userKey"
          placeholder="Chave de entrada"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        {!isValidKey && <p>Chave inválida</p>}

        <button type="submit">Entrar</button>

      </form>
    </div>
  );
}