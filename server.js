const dotenv = require('dotenv')
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const layouts = require('express-ejs-layouts')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

const PORT = process.env.PORT || 3003
const NODE_ENV = process.env.NODE_ENV || 'development'

const app = module.exports = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(layouts)
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(express.static(__dirname + '/public'))

if (NODE_ENV === 'development') {
  app.use(morgan('combined'))
}

const auth = require('./routes/auth')
const activities = require('./routes/activities')

app.use('/api/v1/auth', auth)
app.use('/api/v1/activities', activities)

app.get('/', function (req, res) {
  res.render('index', { user: req.user })
})

app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} in ${NODE_ENV} mode...`)
})
