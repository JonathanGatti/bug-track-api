const express = require('express');
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
router.get('/:id', (req,res)=> {
  
})
//Create issue
router.post('/', (req,res)=> {
  
})

//Update issue
router.patch('/:id', (req,res)=> {
  
})

//Delete issue
router.delete('/:id', (req,res)=> {
  
})

module.exports = router;