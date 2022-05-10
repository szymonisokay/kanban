const express = require('express')
const {
  createUser,
  loginUser,
  getAllUsers,
} = require('../controllers/UserController')

const router = express.Router()

router.get('/', getAllUsers)
router.post('/register', createUser)
router.post('/login', loginUser)

module.exports = router
