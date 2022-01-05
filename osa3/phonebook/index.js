const express = require('express')
const app = express()
const persons = require('./persons.json');

app.use(express.json())

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})