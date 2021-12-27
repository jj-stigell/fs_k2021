import React, { useState, useEffect } from 'react'
import RenderPhonebook from './components/RenderPhonebook'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setNewSearch ] = useState('') // mikä sana/kirjain on haussa
  const [ searchOn, setSearch ] = useState(false)   // onko haku päällä
 
  const addPerson = (event) => {
    event.preventDefault()
      
    if (persons.map(person => person.name).includes(newName)) {
        window.alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    }
  }
  
  
  const searchName = (event) => {
    setSearch(event.target.value.length !== 0)      // jos event target pituus muu kuin 0 niin haku päällä
    setNewSearch(event.target.value.toLowerCase())  // hakusanan asetus
  }

  const namesToShow = !searchOn
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(searchTerm))  // jos haku päällä filtteröidään

  const handleNameChange = (event) => {
  	setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
  	setNewNumber(event.target.value)
  }
  
  return (
  	<div>
    	<h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} searchName={searchName} />
      <h2>Add a new</h2>
      <AddPerson addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
        {(namesToShow.map(person =>
          <RenderPhonebook key={person.name} name={person.name} number={person.number} />
        ))}
      </ul>
    </div>
  )
}

export default App