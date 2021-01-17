const mongoose = require('mongoose');

const issuesSchema = new mongoose.Schema({
  issueId: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  project: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  active: {
    type: Boolean,
    required: true
  },
  priority: {
    type: String,
    required: true
  }
})


module.exports = mongoose.model('Issue', issuesSchema) 

// "author": "Gerry Scotty",
// "project": "Mike pence resume",
// "description": "looking for a job",
// "active": true,
// "priority": "high",