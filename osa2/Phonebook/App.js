import React, { useState } from 'react'
import RenderPhonebook from './components/RenderPhonebook'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

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