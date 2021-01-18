const express = require('express');
const router = express.Router();
const User = require('../models/user');

//get users
router.get('/', async  (req,res) => {
  try {
    const users = await User.find();
    res.json(users)
  } catch(err){
    res.status(500).json({message: err.message})
  }
})

//get user
router.get('/:id', getUser, (req, res) => {
  res.json(res.user)
})

//create user
router.post('/', async (req,res) => {
  const user = new User({
    userId: req.body.userId,
    userName: req.body.userName
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err){
    res.status(400).json({message: err.message});
  }
})

//delete user
router.delete('/:id', getUser, async (req,res) => {
  try {
    await res.user.remove();
    res.json({message: 'User deleted'})
  } catch(err){
    res.status(500).json({message: err.message})
  }
})

async function getUser(req, res, next) {
  try {
    user = await User.findById(req.params.id);
    if(user === null){
      return res.status(404).json({message: 'Cannot find user'})
    }
  } catch(err) {
    return res.status(500).json({message : err.message})
  }
  res.user = user;
  next()
}

module.exports = router;