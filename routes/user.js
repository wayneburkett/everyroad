const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticate')

router.get('/', authenticate, (req, res) => {
  const user = req.user
  if (user) {
    return res.status(200).json({
      success: true,
      data: user
    })
  }
  return res.status(500).json({
    success: false,
    error: 'User not found'
  });
})

module.exports = router
