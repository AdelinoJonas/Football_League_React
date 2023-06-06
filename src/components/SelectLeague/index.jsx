import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';

export function SelectLeague() {
  const { 
    apiKey,
    leagues, 
    filteredLeagues, 
    setFilteredLeagues,
    showDropdown, 
    setShowDropdown,
    getLeagues,
    selectedCountry
   } = useContext(AuthContext);
  
  const [selectedLeague, setSelectedLeague] = useState('');
 
  const handleInputChange = (event) => {
    const value = event.target.value;
    const filtered = leagues.filter((league) =>
    league.league.name.startsWith(value)
    );
    setFilteredLeagues(filtered);
    setSelectedLeague(filtered);
    setShowDropdown(value.length > 0);
  };

  const handleLeagueSelect = (leagueName) => {
    console.log(leagueName);
    setSelectedLeague(leagueName);
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
            <li
            key={league.logo}
            onClick={() => handleLeagueSelect(league.league.name)}
          >
            {league.league.name}
          </li>
          ))}
        </ul>
      )}
    </div>
  );
}
