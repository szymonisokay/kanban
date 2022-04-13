const express = require('express')
const cors = require('cors')
require('dotenv').config()

const connectToDB = require('./db')
const { errorHandler } = require('./middleware/ErrorMiddleware')

const BoardRoutes = require('./routes/BoardRoutes')
const TaskRoutes = require('./routes/TaskRoutes')
const UserRoutes = require('./routes/UserRoutes')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/api/boards', BoardRoutes)
app.use('/api/tasks', TaskRoutes)
app.use('/api/users', UserRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
  connectToDB(process.env.MONGO_URI)
  console.log(`Server is listening on port ${PORT}`)
})
