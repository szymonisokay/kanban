const mongoose = require('mongoose')

const BoardSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please specify board name.'],
    unique: [true, 'Board with this name already exists.'],
  },
})

module.exports = mongoose.model('Board', BoardSchema)
