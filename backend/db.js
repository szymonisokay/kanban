const mongoose = require('mongoose')

const connectToDB = (uri) => {
  mongoose.connect(uri, () => console.log('Db connected'))
}

module.exports = connectToDB
