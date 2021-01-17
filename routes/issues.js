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
  res.json(res.issue)
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
router.patch('/:id', getIssue, async (req,res)=> {
  if(req.body.description != null){
    res.issue.description = req.body.description
  }
  if(req.body.active != null){
    res.issue.active = req.body.active
  }
  if(req.body.priority != null){
    res.issue.priority = req.body.priority
  }
  try {
    const updatedIssue = await res.issue.save();
    res.json(updatedIssue);
  } catch (err){
    res.status(400).json({message: err.message})
  }
})

//Delete issue
router.delete('/:id', getIssue, async (req,res)=> {
  try {
    await res.issue.remove();
    res.json({message: 'Issue deleted'})
  } catch(err){
    res.status(500).json({message: err.message})
  }
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