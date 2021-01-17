const express = require('express');
const { db } = require('../models/issues');
const router = express.Router();
const Issue = require('../models/issues');

// Ger all issues
router.get('/', async (req,res)=> {
  try {
    const issues = await Issue.find()
    res.json(issues)
  } catch (err){
    res.status(500).json({message: err.message})
  }
})
//Get one issue
router.get('/:id', getIssue, (req,res)=> {
  res.send(res.issue.author)
})
//Create issue
router.post('/', async (req,res)=> {
  const issue = new Issue({
    issueId: req.body.issueId,
    author: req.body.author,
    project: req.body.project,
    description: req.body.description,
    active: req.body.active,
    priority: req.body.priority
  })
  try {
    const newIssue = await issue.save()
    res.status(201).json(newIssue);
  } catch (err){
    res.status(400).json({message : err.message});
  }
})

//Update issue
router.patch('/:id', (req,res)=> {
  
})

//Delete issue
router.delete('/:id', (req,res)=> {
  
})

async function getIssue(req, res, next) {
  try {
    issue = await Issue.findById(req.params.id);
    if(issue === null){
      return res.status(404).json({message: 'Cannot find issue'})
    }
  } catch(err) {
    return res.status(500).json({message : err.message})
  }
  res.issue = issue;
  next()
}

module.exports = router;