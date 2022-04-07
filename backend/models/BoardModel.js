const mongoose = require('mongoose')

const BoardSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please specify board name.'],
      unique: true,
    },
    uri: {
      type: String,
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

BoardSchema.pre('save', async function () {
  console.log(this.name)
})

module.exports = mongoose.model('Board', BoardSchema)
