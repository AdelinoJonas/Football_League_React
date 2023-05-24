import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

export function Login() {
  const { 
    apiKey, 
    setApiKey,
    isValidKey, 
    setIsValidKey 
  } = useContext(AuthContext);

  const [errorKey, setErrorKey] = useState(isValidKey);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('https://v3.football.api-sports.io/status', {
        headers: {
          'x-apisports-key': apiKey
        }
      });
      
      // console.log(response.data.response);
      // console.log(response.data.response.subscription.active);
      const { active } = response.data.response;

      if (active) {
        alert("Pode iniciar escolhendo um país")
      } else {
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
      <h2 className="">Welcome to My Team</h2>
      <form onSubmit={(e) => handleSubmit(e, setApiKey)}>
        <input
          type="text"
          name="userKey"
          placeholder="Chave de entrada"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          onFocus={()=>setErrorKey(false)}
        />

        <button type="submit">Entrar</button>

        {errorKey && <p>Chave inválida</p>}

      </form>
    </div>
          
    </AuthContext.Provider>
  );
}