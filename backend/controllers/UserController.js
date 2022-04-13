const User = require('../models/UserModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

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

module.exports = {
  createUser,
}
