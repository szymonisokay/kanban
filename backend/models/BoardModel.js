const mongoose = require('mongoose')

const BoardSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please specify board name.'],
      unique: true,
    },
    desc: {
      type: String,
      default: 'Short description about the project',
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        default: [],
      },
    ],
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Board', BoardSchema)
