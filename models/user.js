const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId:{
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userPassword: {
    type: String,
    required: true
  },
  userProjects: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('User', userSchema)