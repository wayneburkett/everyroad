const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  stravaId: {
    type: Number,
    required: [true, 'Strava ID is required']
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required']
  },
  city: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', UserSchema)
