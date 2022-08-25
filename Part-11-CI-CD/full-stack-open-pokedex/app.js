const express = require('express')
const app = express()
const port = 5001

// Heroku dynamically sets a port
const PORT = process.env.PORT || port

app.use(express.static('dist'))

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started on port ${port}`)
})

app.get('/health', (req, res) => {
  res.send('ok')
})