const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default:  Date.now
  },
  content: {
    type: String,
    required: true
  },
  issueReference:{
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Comment',commentsSchema)