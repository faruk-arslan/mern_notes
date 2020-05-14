const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  // uid: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  creationDate: { type: Date, required: false },
  modificationDate: { type: Date, required: false }
  // email: String,
  // password: String
})

module.exports = mongoose.model('User', usersSchema);