const bodyParser = require('body-parser')
const express = require('express')
require('dotenv').config()
const connectToDB = require('./db')

const BoardRoutes = require('./routes/BoardRoutes')

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/boards', BoardRoutes)

app.listen(PORT, () => {
  connectToDB(process.env.MONGO_URI)
  console.log(`Server is listening on port ${PORT}`)
})
