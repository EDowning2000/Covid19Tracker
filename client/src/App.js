import React, { useState, useEffect } from "react";
import "./App.css";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./Components/InfoBox";
import Map from "./Components/Map";

function App() {
  const [countries, setCountries] = useState([""]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    console.log(countryCode);
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };
  console.log("country info>>>", countryInfo);

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
      <div className="appLeft">
        <div className="appHeader">
          <h1>Covid tracker</h1>
          <FormControl className="appDropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="stats">
          <InfoBox
            title="Covid19 Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        <Map />
      </div>
      <Card className="appRight">
        <CardContent>
          <h3>Cases by country</h3>
          <h3>Cases total</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
