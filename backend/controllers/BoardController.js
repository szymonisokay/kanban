const asyncHandler = require('express-async-handler')
const Board = require('../models/BoardModel')

const getSingleBoard = asyncHandler(async (req, res) => {
  const { name } = req.params

  const convertedName = (name.charAt(0).toUpperCase() + name.slice(1)).replace(
    '-',
    ' '
  )
  const board = await Board.find({ name: convertedName })

  await Board.populate(board, { path: 'tasks', populate: { path: 'status' } })

  res.status(200).json({ board })
})

const getBoards = asyncHandler(async (req, res) => {
  const boards = await Board.find({})

  res.status(200).json({ boards })
})

const createBoard = asyncHandler(async (req, res) => {
  const { name } = req.body

  const board = await Board.create({ name })

  res.status(201).json({ board })
})

module.exports = {
  getSingleBoard,
  getBoards,
  createBoard,
}
