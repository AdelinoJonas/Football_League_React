import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router';

export function Login() {
  const navigate = useNavigate();

  const { apiKey, setApiKey, setIsValidKey, isValidKey, localApiKey, 
    setLocalApiKey } = useContext(AuthContext);
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

      const active = response.data.results === 1;

      if (active) {
        setIsValidKey(true);
        setLocalApiKey(e.target.value)
        navigate('/home');
        console.log(e.target.value)
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
        <h2 className="">Bem Vindo a Meu Time</h2>
        <form onSubmit={(e) => handleSubmit(e, setApiKey)}>
        <div className="containerInput">
          <input
            type="text"
            name="userKey"
            placeholder="Chave de entrada"
            onChange={(e) => setApiKey(e.target.value)}
            onFocus={() => setErrorKey(false)}
          />
          {errorKey && !apiKey && <span>Chave obrigatória</span>}
          {errorKey && !isValidKey && <span>Chave inválida</span>}
        </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </AuthContext.Provider>
  );
}
