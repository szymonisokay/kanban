const express = require('express')
const {
  getTask,
  getTasksFromBoard,
  createTask,
} = require('../controllers/TaskController')

const router = express.Router()

router.get('/', getTasksFromBoard)
router.get('/:id', getTask)
router.post('/', createTask)

module.exports = router
