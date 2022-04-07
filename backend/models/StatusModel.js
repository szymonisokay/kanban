const mongoose = require('mongoose')

const StatusSchema = mongoose.Schema({
  type: {
    type: String,
  },
})

module.exports = mongoose.model('Status', StatusSchema, 'status')
