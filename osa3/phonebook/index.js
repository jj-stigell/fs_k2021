const { request, response } = require('express');
const express = require('express')
const app = express()
let persons = require('./persons.json');

app.use(express.json())

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {

  const id = Number(request.params.id);
  const contact = persons.find(person => person.id === id)
  if (contact) {
    response.json(contact)
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {

  const time = Date();
  const amount = Object.keys(persons).length;
  response.send(`
    <p>Phonebook has info for ${amount} people.</p>
    <br>
    <p>${time}</p>
  `)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', async (request, response) => {

  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'some content missing' 
    })
  } else if ((persons.find(person => person.name === body.name))) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const contactInfo = {
    id: parseInt(Math.random() * 999999),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(contactInfo)
  response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})