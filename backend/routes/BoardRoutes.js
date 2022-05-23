const express = require('express')
const {
  getBoards,
  getSingleBoard,
  createBoard,
  deleteBoard,
  updateBoard,
} = require('../controllers/BoardController')
const { authorization } = require('../middleware/AuthMiddleware')

const router = express.Router()

router.get('/', authorization, getBoards)
router.get('/:id', authorization, getSingleBoard)
router.post('/', authorization, createBoard)
router.put('/:id', authorization, updateBoard)
router.delete('/:id', authorization, deleteBoard)

module.exports = router
