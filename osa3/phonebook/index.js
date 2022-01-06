
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

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    const time = Date();
    const amount = Object.keys(persons).length;
    response.send(`
      <p>Phonebook has info for ${amount} people.</p>
      <br>
      <p>${time}</p>
    `)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
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

app.put('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndUpdate(request.params.id, request.body, { new: true })
    .then(updatedPerson => {
      console.log(updatedPerson)
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
