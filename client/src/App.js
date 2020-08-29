import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, Select, MenuItem } from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState(["usa", "uk", "canada"]);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData()
  }, []);

  return (
    <div className="App">
      <div className="appHeader">
        <h1>Covid tracker</h1>
        <FormControl className="appDropdown">
          <Select variant="outlined" value="test">
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
