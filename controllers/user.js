const User = require('../models/User')

module.exports.getUser = async (profile) => {
  try {
    const user = await User.findOneAndUpdate(
      { stravaId: profile.id },
      { name: profile.displayName },
      { 
        upsert: true,
        lean: true 
      }
    )
    return user
  } catch (err) {
    console.log(`Error retrieving user: ${err.message}`)
    return null
  }
}
