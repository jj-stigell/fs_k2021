import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Puuha-Pete', number: '040-1234567' }
  ]) 
  const [ newName, setNewName ] = useState('')
  
  const [ newNumber, setNewNumber ] = useState('')
 
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
  
  const handleNameChange = (event) => {
  	setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
  	setNewNumber(event.target.value)
  }
  
  return (
  	<div>
    	<h2>Phonebook</h2>
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
          		{(persons.map(person => <li key={person.name}>{person.name} {person.number}</li>))}
      		</ul>
    </div>
  )
}

export default App