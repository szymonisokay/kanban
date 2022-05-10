const User = require('../models/UserModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please provide all data')
  }

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({ name, email, password: hashedPassword })

  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: '1d',
  })

  const newUser = {
    id: user._id,
    name: user.name,
    email: user.email,
    image: user.image,
    token,
  }

  res.status(200).json({ user: newUser })
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Please provide all data')
  }

  const user = await User.findOne({ email })

  if (!user) {
    res.status(400)
    throw new Error('User not found')
  }

  const passwordsDoMatch = await bcrypt.compare(password, user.password)

  if (!passwordsDoMatch) {
    res.status(400)
    throw new Error('Wrong password')
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: '1d',
  })

  const loggedUser = {
    id: user._id,
    name: user.name,
    email: user.email,
    image: user.image,
    token,
  }

  res.status(200).json({ user: loggedUser })
})

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})

  if (!users) {
    res.status(404)
    throw new Error('No users')
  }

  res.status(200).json(users)
})

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
}
