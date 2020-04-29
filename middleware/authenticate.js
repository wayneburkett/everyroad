// use as route middleware for any route that requires authentication
module.exports = (req, res, next) => {
  // this just checks for the existence of req.session.passport.user
  if (req.isAuthenticated()) {
    return next()
  }
  return res.status(401).json({
    success: false,
    error: 'Unauthorized'
  })
}
