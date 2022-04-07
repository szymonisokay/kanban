const mongoose = require('mongoose')
const Status = require('./StatusModel')

const TaskSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please specify task name.'],
    },
    desc: {
      type: String,
      default: 'Short description about the task',
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Status',
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
  },
  { timestamps: true }
)

TaskSchema.pre('save', async function (next) {
  const type = await Status.find({ type: 'To Do' })
  this.status = type[0]._id

  next()
})

module.exports = mongoose.model('Task', TaskSchema)
