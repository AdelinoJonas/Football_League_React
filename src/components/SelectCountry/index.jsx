import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';

export function SelectCountry() {
  const { 
    apiKey,
    countries, 
    filteredCountries, 
    setFilteredCountries,
    showDropdown, 
    setShowDropdown,
    getCountries,
    selectedCountry, 
    setSelectedCountry
   } = useContext(AuthContext);

  console.log(apiKey);

 
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const filtered = countries.filter((country) =>
      country.name.startsWith(inputValue)
    );
    setFilteredCountries(filtered);
    setSelectedCountry('');
    setShowDropdown(inputValue.length > 0);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setFilteredCountries([]);
    setShowDropdown(false);
  };

  useEffect(() => {
    getCountries(apiKey);
  }, [apiKey]);

  return (
    <div>
      <input type="text" placeholder="Digite um país" onChange={handleInputChange} defaultValue={selectedCountry}/>
      {showDropdown && (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.flag} onClick={() => handleCountrySelect(country.name)}>
              {country.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
