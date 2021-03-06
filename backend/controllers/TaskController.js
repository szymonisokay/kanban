const asyncHandler = require('express-async-handler')
const Task = require('../models/TaskModel')
const Board = require('../models/BoardModel')
const Status = require('../models/StatusModel')
const TaskModel = require('../models/TaskModel')

const getTask = asyncHandler(async (req, res) => {
  const { id } = req.params
  const task = await Task.findById(id)

  await Task.populate(task, { path: 'status' })

  res.status(200).json({ task })
})

const getTasksFromBoard = asyncHandler(async (req, res) => {
  const { boardId } = req.body

  const tasks = await Task.find({ boardId })

  await Task.populate(tasks, { path: 'status' })

  res.status(200).json({ tasks })
})

const createTask = asyncHandler(async (req, res) => {
  const { boardId } = req.body
  const task = await Task.create({ ...req.body, createdBy: req.user._id })

  await Task.populate(task, { path: 'status' })
  await Task.populate(task, { path: 'user', select: '-password -__v' })

  const board = await Board.findById(boardId)
  board.tasks.push(task._id)
  board.save()

  res.status(201).json(task)
})

const updateTask = asyncHandler(async (req, res) => {
  const { id: taskId } = req.params

  const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true })

  if (!task) {
    res.status(400)
    throw new Error('Task not found')
  }

  await Task.populate(task, { path: 'status' })
  await Task.populate(task, { path: 'user', select: '-password -__v' })

  res.status(201).json(task)
})

const deleteTask = asyncHandler(async (req, res) => {
  const { id: taskId } = req.params

  const task = await TaskModel.findByIdAndDelete(taskId)

  if (!task) {
    res.status(400)
    throw new Error('Task not found')
  }

  res.status(200).json(task)
})

const getAllStatuses = asyncHandler(async (req, res) => {
  const statuses = await Status.find({})

  res.status(200).json(statuses)
})

module.exports = {
  getTask,
  getTasksFromBoard,
  createTask,
  getAllStatuses,
  updateTask,
  deleteTask,
}
