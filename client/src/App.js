import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, Select, MenuItem } from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState(["usa", "uk", "canada"]);

  //everytime this component is rendered this is run 
  useEffect(() => {
    const getCountriesData = async () => {
      //waiting for all the json info to come in
      await fetch("https://disease.sh/v3/covid-19/countries")
      //getting the json info
        .then((response) => response.json())
        //sifting through the data
        .then((data) => {
          //countries object is mapping through the countries of the json and setting them equal to an object which is then being set in the state to be called
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          //setting the countries into the state
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
