import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import InfoBox from './Components/InfoBox'

function App() {
  const [countries, setCountries] = useState([""]);
  const [country, setCountry] = useState("worldwide");
  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    console.log(countryCode);
    setCountry(countryCode);
  };

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
          console.log(data);
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          //setting the countries into the state
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  return (
    <div className="App">
      <div className="appHeader">
        <h1>Covid tracker</h1>
        <FormControl className="appDropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="stats">
        <InfoBox title="Covid19 Cases" total={2000}/>
        <InfoBox title="Recovered" total={2200}/>
        <InfoBox title="Deaths" total={4000}/>




      </div>





    </div>
  );
}

export default App;
