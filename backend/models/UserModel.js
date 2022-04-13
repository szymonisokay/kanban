const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
  },
  image: {
    type: String,
    default: '',
  },
})

module.exports = mongoose.model('User', UserSchema)
