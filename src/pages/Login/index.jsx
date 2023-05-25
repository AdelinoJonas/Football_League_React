import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router';

export function Login() {
  const navigate = useNavigate();

  const { apiKey, setApiKey, setIsValidKey, isValidKey } = useContext(AuthContext);
  const [errorKey, setErrorKey] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!apiKey) {
      setErrorKey(true);
      setIsValidKey(false);
      return;
    }

    try {
      const response = await axios.get('https://v3.football.api-sports.io/status', {
        headers: {
          'x-apisports-key': apiKey
        }
      });

      console.log(response.data.results);
      const active = response.data.results === 1;
      console.log(active);

      if (active) {
        setIsValidKey(true);
        navigate('/home');
      } 
      if(!active){
        setIsValidKey(false);
        setErrorKey(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ setApiKey }}>
      <div>
        <h2 className="">Bem Vindo ao Meu Time</h2>
        <form onSubmit={(e) => handleSubmit(e, setApiKey)}>
          <input
            type="text"
            name="userKey"
            placeholder="Chave de entrada"
            onChange={(e) => setApiKey(e.target.value)}
            onFocus={() => setErrorKey(false)}
          />
          <button type="submit">Login</button>
          {errorKey && !apiKey && <p>Chave obrigatória</p>}
          {errorKey && !isValidKey && <p>Chave inválida</p>}
        </form>
      </div>
    </AuthContext.Provider>
  );
}
