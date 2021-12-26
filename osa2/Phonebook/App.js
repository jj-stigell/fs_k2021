import React, { useState } from 'react'

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
    setSearch(event.target.value.length !== 0)  // jos event target pituus muu kuin 0 niin haku päällä
    setNewSearch(event.target.value)            // hakusanan asetus
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
      <div>
				  filter shown with: <input value={searchTerm} onChange={searchName}/>
      </div>
      <h2>Add a new</h2>
    	<form onSubmit={addPerson}>
        <div>
				  name: <input value={newName} onChange={handleNameChange}/>
        </div>
	  		<div>
	  			number: <input value={newNumber} onChange={handleNumberChange}/>
	  		</div>
        <div>
				  <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {(namesToShow.map(person =>
          <li key={person.name}>{person.name} {person.number}</li>
        ))}
      </ul>
    </div>
  )
}

export default App