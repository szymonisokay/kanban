const express = require('express')
const {
  getBoards,
  getSingleBoard,
  createBoard,
} = require('../controllers/BoardController')
const { authorization } = require('../middleware/AuthMiddleware')

const router = express.Router()

router.get('/', authorization, getBoards)
router.get('/:id', authorization, getSingleBoard)
router.post('/', authorization, createBoard)

module.exports = router
