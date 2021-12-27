import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY
let city = ''

const Filter = ({ searchTerm, searchName }) => {
  return (
    <div>
    find countries: <input value={searchTerm} onChange={searchName}/>
    </div>
  )
}

const RenderCountries = ({ countries, searchTerm, setNewSearch, weather }) => {

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm))

  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (filteredCountries.length === 1) {
    

    //console.log(filteredCountries[0].capital);

    city = filteredCountries[0].capital;
    const obj = filteredCountries[0].languages;
    let languages = [];

    for(var i in obj) {
      languages.push(obj[i]);
    }

    console.log(weather.main.temp);

    return (
      <div>
        {(filteredCountries.map(country =>
          <div>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Population {country.population}</p>
          <h3>Languages:</h3>
          <ul>
            {(languages.map(language =>
              <li key={language}> {language} </li> 
            ))}
          </ul>

          <br/>
          <img src={country.flags.png} alt="Flagphoto" />
          <br/>
          <h2>Weather in {country.capital}</h2>
          <p>Temperature: {weather.main.temp} Celcius</p>
          <p>Humidity: {weather.main.humidity} %</p>
          <p>wind speed: {weather.wind.speed} m/s</p>
          </div>
        ))}
      </div>
    )
  } else {

    return (
      <ul>
        {(filteredCountries.map(country =>
          <li key={country.name.common}>
            {country.name.common} 
            <form onSubmit={() => setNewSearch(country.name.common.toLowerCase())}>
              <button type="submit">Show</button>
            </form>
          </li> 
        ))}
      </ul>
    )
  }
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ searchTerm, setNewSearch ] = useState('') // mikä sana/kirjain on haussa
  const [ weather, setWeather ] = useState([])

  useEffect(() => {
    //console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        //console.log('promise fulfilled')
        //console.log(response.data);
        setCountries(response.data)
        
      })
  }, [])

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`)
      .then(response => {
      setWeather(response.data)
      })
  }, [searchTerm])

  const searchName = (event) => {
    setNewSearch(event.target.value.toLowerCase())  // hakusanan asetus
  }

  return (
  	<div>
      <Filter searchTerm={searchTerm} searchName={searchName} />
      <RenderCountries countries={countries} searchTerm={searchTerm} setNewSearch={setNewSearch} weather={weather} />
    </div>
  )
}

export default App