const express = require('express')
const router = express.Router()
const activitiesController = require('../controllers/activities.js')

router.get('/', authenticate, activitiesController.getActivities)
router.get('/:id', authenticate, activitiesController.getActivity)
router.get('/:id/stream', authenticate, activitiesController.getActivityStream)

// use as route middleware for any route that requires authentication
// TODO: this will probably end up in a separate file somewhere
function authenticate (req, res, next) {
  // this just checks for the existence of req.session.passport.user
  if (req.isAuthenticated()) { return next() }
  // TODO: I guess this should probably return an error...
  res.redirect('/')
}

module.exports = router
