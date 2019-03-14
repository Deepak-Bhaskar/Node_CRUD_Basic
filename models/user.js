const mongoose = require('mongoose')
const Schema = mongoose.Schema

let UserSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number },
  mobile: { type: Number, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
})

// Export the model
module.exports = mongoose.model('User', UserSchema)