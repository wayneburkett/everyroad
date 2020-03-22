const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))

app.get('/', (req, res) => {
  console.log('Responding to route route')
  res.send('Hello, world!')
})

app.get('/test', (req, res) => {
  const test = { msg: 'Success' }
  res.json(test)
})

app.listen(3003, () => {
  console.log('Server is listening on port 3003...')
})
