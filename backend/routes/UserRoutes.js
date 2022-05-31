const express = require('express')
const {
  createUser,
  loginUser,
  getAllUsers,
  getUser,
} = require('../controllers/UserController')

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUser)
router.post('/register', createUser)
router.post('/login', loginUser)

module.exports = router
