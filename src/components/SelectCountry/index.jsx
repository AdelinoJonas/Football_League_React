import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

export function SelectCountry () {
  const { countries, apiKey, getCountries } = useContext(AuthContext);
  
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const filtered = countries.filter((country) =>
      country.name.startsWith(inputValue)
    );
    setFilteredCountries(filtered);
    setSelectedCountry(inputValue);
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
      <input type="text" placeholder="Digite um país" onChange={handleInputChange} value={selectedCountry} />
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
  )
}
