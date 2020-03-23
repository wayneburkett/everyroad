require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const axios = require('axios')

const app = express()
app.use(morgan('combined'))
app.use(express.static(__dirname + '/public'))

const { ISSUER, CLIENT_ID, CLIENT_SECRET, SCOPE } = process.env

app.get('/oauth/redirect', (req, res) => {
  const requestToken = req.query.code
  let request = `${ISSUER}/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${requestToken}&grant_type=authorization_code`
  axios({
    method: 'post',
    url: request,
    headers: {
         accept: 'application/json'
    }
  }).then((response) => {
    const accessToken = response.data.access_token
    res.redirect(`/welcome.html?access_token=${accessToken}`)
  }).catch((error) => {
    res.redirect('/')
  })
})

app.get('/', (req, res) => {
  console.log('Responding to root route')
  res.send('Hello, world!')
})

app.get('/test', (req, res) => {
  const test = { msg: 'Success' }
  res.json(test)
})

app.listen(3003, () => {
  console.log('Server is listening on port 3003...')
})
