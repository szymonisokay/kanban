const express = require('express')
const {
  getBoards,
  getSingleBoard,
  createBoard,
} = require('../controllers/BoardController')

const router = express.Router()

router.get('/', getBoards)
router.get('/:id', getSingleBoard)
router.post('/', createBoard)

module.exports = router
