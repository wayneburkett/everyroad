const express = require('express')
const router = express.Router()
const activitiesController = require('../controllers/activities')
const authenticate = require('../middleware/authenticate')

router.get('/', authenticate, activitiesController.getActivities)
router.get('/:id', authenticate, activitiesController.getActivity)
router.get('/:id/stream', authenticate, activitiesController.getActivityStream)

module.exports = router
