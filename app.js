require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const passport = require('passport')
const stravaStrategy = require('passport-strava-oauth2')
const layouts = require('express-ejs-layouts')

const activitiesController = require('./controllers/activities.js')

const { ISSUER, CLIENT_ID, CLIENT_SECRET, SCOPE } = process.env

const app = express()
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(morgan('combined'))
app.use(layouts)
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(__dirname + '/public'))

app.listen(3003, () => {
  console.log('Server is listening on port 3003...')
})

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

passport.use(new stravaStrategy.Strategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: 'http://localhost:3003/auth/strava/callback'
},
function (accessToken, refreshToken, profile, done) {
  // TODO: this is where we'll associate the Strava user with a local user
  done(null, profile)
}
))

// forward to Strava for authentication
app.get('/auth/strava',
  passport.authenticate('strava', { scope: [SCOPE] }),
  function (req, res) {
    // noop
  })

app.get('/auth/strava/callback',
  passport.authenticate('strava', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/')
  })

app.get('/', function (req, res) {
  res.render('index', { user: req.user })
})

app.get('/map/:id', authenticate, function (req, res) {
  res.render('stream', {
    layout: 'map-layout.ejs',
    id: req.params.id,
    user: req.user
  })
})

app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

// controllers

app.get('/activities', authenticate, activitiesController.getActivities)
app.get('/activities/:id', authenticate, activitiesController.getActivity)
app.get('/activities/:id/stream', authenticate, activitiesController.getActivityStream)

// use as route middleware for any route that requires authentication
function authenticate (req, res, next) {
  if (req.isAuthenticated()) { return next() }
  // TODO: I guess this should probably return an error...
  res.redirect('/')
}
