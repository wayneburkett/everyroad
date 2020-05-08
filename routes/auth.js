const app = require('../server')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const stravaStrategy = require('passport-strava-oauth2')
const authenticate = require('../middleware/authenticate')
const userController = require('../controllers/user')
const utils = require('../utils/responses')

const { CLIENT_ID, CLIENT_SECRET, SCOPE } = process.env

const stravaConfig = {
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: 'http://localhost:3003/api/v1/auth/strava/callback'
}

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

passport.use(
  new stravaStrategy.Strategy(stravaConfig, async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await userController.getUser(profile)
      done(null, {
        ...user,
        token: profile.token,
        strava: profile
      })
    } catch (err) {
      console.log(`Error retrieving user: ${err.message}`)
      done(null, null)
    }
  }))

router.get('/', authenticate, (req, res) => {
  const user = req.user
  const responder = utils.createResponder(res)
  if (user) {
    return responder.success(user)
  }
  // user should already have been authenticated, but the user object is empty, so
  // something is wrong
  return responder.failure(500, 'Retrieved an empty user object')
})

// forward to Strava for authentication
router.get('/strava',
  passport.authenticate('strava', { scope: [SCOPE] }),
  function (req, res) {
    // noop
  })

router.get('/strava/callback',
  passport.authenticate('strava', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('http://localhost:3000')
  })

module.exports = router
