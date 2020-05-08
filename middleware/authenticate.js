const utils = require('../utils/responses')

// use as route middleware for any route that requires authentication
module.exports = (req, res, next) => {
  // this just checks for the existence of req.session.passport.user
  if (req.isAuthenticated()) {
    return next()
  }
  return utils.createResponder(res).unauthorized()
}
