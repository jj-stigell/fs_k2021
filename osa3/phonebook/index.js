const express = require('express')
const app = express()
const persons = require('./persons.json');

app.use(express.json())

app.get('/api/persons', (request, response) => {
  response.json(persons)
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})