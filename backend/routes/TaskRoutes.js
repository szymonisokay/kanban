const express = require('express')
const {
  getTask,
  getTasksFromBoard,
  createTask,
  getAllStatuses,
  updateTask,
  deleteTask,
} = require('../controllers/TaskController')
const { authorization } = require('../middleware/AuthMiddleware')

const router = express.Router()

router.get('/status', getAllStatuses)
router.get('/', authorization, getTasksFromBoard)
router.get('/:id', authorization, getTask)
router.post('/', authorization, createTask)
router.put('/:id', authorization, updateTask)
router.delete('/:id', authorization, deleteTask)

module.exports = router
