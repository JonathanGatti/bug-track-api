const express = require('express');
const router = express.Router();
const Comment = require('../models/comments');

// Get all comments
router.get('/', async (req,res)=> {
  try {
    const comments = await Comment.find()
    res.json(comments)
  } catch (err){
    res.status(500).json({message: err.message})
  }
})
//Get one comments
router.get('/:id', getComment, (req,res)=> {
  res.json(res.comment)
})
//Create comment
router.post('/', async (req,res)=> {
  const comment = new Comment({
    authorId: req.body.authorId,
    content: req.body.content
  })
  try {
    const newComment = await comment.save()
    res.status(201).json(newComment);
  } catch (err){
    res.status(400).json({message : err.message});
  }
})

//Update comment
router.patch('/:id', getComment, async (req,res)=> {
  if(req.body.content != null){
    res.comment.content = req.body.content
  }
  try {
    const updatedComment = await res.comment.save();
    res.json(updatedComment);
  } catch (err){
    res.status(400).json({message: err.message})
  }
})

//Delete comment
router.delete('/:id', getComment, async (req,res)=> {
  try {
    await res.comment.remove();
    res.json({message: 'Comment deleted'})
  } catch(err){
    res.status(500).json({message: err.message})
  }
})

async function getComment(req, res, next) {
  try {
    comment = await Comment.findById(req.params.id);
    if(comment === null){
      return res.status(404).json({message: 'Cannot find comment'})
    }
  } catch(err) {
    return res.status(500).json({message : err.message})
  }
  res.comment = comment;
  next()
}

module.exports = router;