const mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  teamMembers: {
    type: Array,
    required: true
  },
  projectIssues: {
    type: Array,
    required: true
  },
  projectId: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  key: {
    type: Number,
    required: true,
    default: Math.random() * 100
  },
  value: {
    type: String,
    require: true
  }
})


module.exports = mongoose.model('Projects', projectsSchema) 

