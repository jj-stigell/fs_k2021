
require('dotenv').config()
const { request, response } = require('express');
const express = require('express')
const app = express()
let persons = require('./persons.json');
const morgan = require('morgan')
const CORS = require('cors')
const Person = require('./models/person')

morgan.token('content', function (request, response) { return JSON.stringify(request.body) })

app.use(express.json())
app.use(CORS())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
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

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  
  person.save().then(savedPerson => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})