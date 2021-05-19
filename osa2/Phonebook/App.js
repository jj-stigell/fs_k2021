import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  
  const addPerson = (event) => {
	event.preventDefault()
	setPersons(persons.concat({name: newName}))
	setNewName('')
	}
  
  const handleNameChange = (event) => {
  	setNewName(event.target.value)
  }

  const List = ({persons}) => (persons.map(person => <li key = {person.name}>{person.name}</li>))
  
  const Numbers = ({persons}) => {
	  
	return (
		<div>
			<List persons={persons} />
		</div>  
  	)
  }
  	
  return (
  	<div>
    	<h2>Phonebook</h2>
    	<form onSubmit={addPerson}>
        	<div>
				name: <input value={newName} onChange={handleNameChange}/>
        	</div>
        	<div>
				<button type="submit">add</button>
        	</div>
      	</form>
      	<h2>Numbers</h2>
      		<ul>
          		<Numbers persons={persons} />
      		</ul>
    </div>
  )
}

export default App