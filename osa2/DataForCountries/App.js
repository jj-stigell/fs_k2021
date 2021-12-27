import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ({ searchTerm, searchName }) => {
  return (
    <div>
    find countries: <input value={searchTerm} onChange={searchName}/>
    </div>
  )
}

const RenderCountries = ({ countries, searchTerm, setNewSearch }) => {

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm))

  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (filteredCountries.length === 1) {

    const obj = filteredCountries[0].languages;
    const languages = [];

    for(var i in obj) {
      languages.push(obj[i]);
    }

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

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data);
        setCountries(response.data)
        
      })
  }, [])

  const searchName = (event) => {
    setNewSearch(event.target.value.toLowerCase())  // hakusanan asetus
    console.log(countries.length);
  }

  return (
  	<div>
      <Filter searchTerm={searchTerm} searchName={searchName} />
      <RenderCountries countries={countries} searchTerm={searchTerm} setNewSearch={setNewSearch} />
    </div>
  )
}

export default App