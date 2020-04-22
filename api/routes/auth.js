const app = require('../app')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const stravaStrategy = require('passport-strava-oauth2')

const { CLIENT_ID, CLIENT_SECRET, SCOPE } = process.env

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

passport.use(
  new stravaStrategy.Strategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: 'http://localhost:3003/api/v1/auth/strava/callback'
  }, function (accessToken, refreshToken, profile, done) {
    // TODO: this is where we'll associate the Strava user with a local user
    done(null, profile)
  }))

// forward to Strava for authentication
router.get('/strava',
  passport.authenticate('strava', { scope: [SCOPE] }),
  function (req, res) {
    // noop
  })

router.get('/strava/callback',
  passport.authenticate('strava', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/')
  })


module.exports = router
