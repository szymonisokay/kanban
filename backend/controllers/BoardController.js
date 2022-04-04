const Board = require('../models/BoardModel')

const getBoards = (req, res) => {
  res.status(200).json({ msg: 'hello' })
}

const createBoard = async (req, res) => {
  const { name } = req.body
  try {
    const board = await Board.create({ name })
    res.status(201).json({ board })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
}

module.exports = {
  getBoards,
  createBoard,
}
