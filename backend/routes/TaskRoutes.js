const express = require('express')
const {
  getTask,
  getTasksFromBoard,
  createTask,
  getAllStatuses,
  updateTask,
} = require('../controllers/TaskController')
const { authorization } = require('../middleware/AuthMiddleware')

const router = express.Router()

router.get('/status', getAllStatuses)
router.get('/', authorization, getTasksFromBoard)
router.get('/:id', authorization, getTask)
router.post('/', authorization, createTask)
router.put('/:id', authorization, updateTask)

module.exports = router
