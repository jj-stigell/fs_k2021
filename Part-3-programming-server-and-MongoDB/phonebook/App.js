import React, { useState, useEffect } from 'react'
import RenderPhonebook from './components/RenderPhonebook'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import Notification  from './components/Notification'
import Errors from './components/Errors'
import contactService from './services/contacts'




/*
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='succesful'>
      {message}
    </div>
  )
}

const ErrorMsg = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

*/

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setNewSearch ] = useState('') // mikä sana/kirjain on haussa
  const [ searchOn, setSearch ] = useState(false)   // onko haku päällä
  const [errors, setErrors] = useState(null)
  //const [successMessage, setSuccessMessage] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    console.log('effect')
    contactService
      .getContacts()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])


  const notifyWith = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)	//timeout poistaa viestin xms jälkeen
    }, 5000)
  }
  
  const showErrors = (errors, type='error') => {
    setErrors({ errors, type })
    setTimeout(() => {
      setErrors(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const newContact = {
      name: newName,
      number: newNumber
    }
      
    if (persons.map(person => person.name).includes(newName)) {
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const person = persons.filter(person => person.name === newName)
          const id = person[0].id
          contactService
          .updateContact(id, newContact)
          .then(response => {
            setPersons(persons.map(person => person.id !== id ? person : response.data))
            setNewName('')
            setNewNumber('')
          })

      }
    } else {
      contactService
        .addContact(newContact)
        .then(response => {
          if (response.data.errors) {
            
            console.log("virehitö")
            showErrors(response.data.errors) 
          } else {
            setPersons(persons.concat(response.data[response.data.length - 1]))
            setNewName('')
            setNewNumber('')
            notifyWith(`Added ${newContact.name}`) 
          }
        })


        
        /*
        setSuccessMessage(`Added ${newContact.name}`)

        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        */
    }
  }

  const deletePerson = (event, id, name) => {
    event.preventDefault()
    contactService.deleteContact(id).catch(error => {
      
      notifyWith(`Information of '${name}' has already been removed from server`, 'error') 

      /*
      setErrorMessage(
        `Information of '${name}' has already been removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      */


    })
    setPersons(persons.filter(person => person.id !== id))

    
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
      <Notification notification={notification} />
      <Errors errors={errors} />
      <Filter searchTerm={searchTerm} searchName={searchName} />
      <h2>Add a new</h2>
      <AddPerson addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
        {(namesToShow.map(person =>
          <RenderPhonebook id={person.id} name={person.name} number={person.number} deletePerson={deletePerson} />
        ))}
      </ul>
    </div>
  )
}

export default App