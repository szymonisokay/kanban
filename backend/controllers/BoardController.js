const asyncHandler = require('express-async-handler')
const Board = require('../models/BoardModel')

const getSingleBoard = asyncHandler(async (req, res) => {
  const { id } = req.params

  const board = await Board.findById(id)

  await Board.populate(board, { path: 'users', select: '-password -__v' })
  await Board.populate(board, {
    path: 'tasks',
    populate: { path: 'status user', select: '-password -__v' },
  })
  // await Board.populate(board, { path: 'tasks', populate: { path: 'user' } })

  res.status(200).json(board)
})

const getBoards = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user

  const boards = await Board.find({ users: { $in: userId } }).populate({
    path: 'users',
    select: '-password -__v',
  })

  res.status(200).json(boards)
})

const createBoard = asyncHandler(async (req, res) => {
  const { name, desc, users } = req.body
  const { _id: userId } = req.user

  if (!name) {
    res.status(400)
    throw new Error("Enter board's name")
  }

  const boardExists = await Board.findOne({ name })

  if (boardExists) {
    res.status(400)
    throw new Error('Board with this name already exists')
  }

  users.push(userId.toString())

  const uniqueUsers = [...new Set(users)]

  const board = await Board.create({
    name,
    desc,
    users: uniqueUsers,
    createdBy: userId,
  })

  await Board.populate(board, { path: 'users', select: '-password -__v' })

  res.status(201).json(board)
})

const deleteBoard = asyncHandler(async (req, res) => {
  const { id: boardId } = req.params

  const board = await Board.findByIdAndDelete(boardId, { new: true })

  if (!board) {
    res.status(400)
    throw new Error('Board not found')
  }

  res.status(200).json(board._id)
})

module.exports = {
  getSingleBoard,
  getBoards,
  createBoard,
  deleteBoard,
}
