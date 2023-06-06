import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';

export function SelectSeason() {
  const { 
    apiKey,
    countries,
    leagues, 
    filteredLeagues, 
    setFilteredLeagues,
    showDropdown, 
    setShowDropdown,
    getLeagues
   } = useContext(AuthContext);
  
  const [selectedLeague, setSelectedLeague] = useState('');
 
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const filtered = leagues.filter((league) =>
      league.name.startsWith(inputValue)
    );
    setFilteredLeagues(filtered);
    setSelectedLeague('');
    setShowDropdown(inputValue.length > 0);
  };

  const handleLeagueSelect = (league) => {
    setSelectedLeague(league);
    setFilteredLeagues([]);
    setShowDropdown(false);
  };

  useEffect(() => {
    getLeagues(apiKey);
  }, [apiKey]);

  return (
    <div>
      <input type="text" placeholder="Digite uma Liga" onChange={handleInputChange} defaultValue={selectedLeague}/>
      {showDropdown && (
        <ul>
          {filteredLeagues.map((league, index) => (
            <li key={league.id} onClick={() => handleLeagueSelect(league.name)}>
              {league.name}
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => console.log(countries)}>click</button>
    </div>
  );
}
