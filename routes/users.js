const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

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
  
  try {
    const hashedPassword = await bcrypt.hash(req.body.userPassword, 10)
    const user = new User({
      userId: req.body.userId,
      userName: req.body.userName,
      userPassword: hashedPassword,
      userProjects: req.body.userProjects
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err){
    res.status(400).json({message: err.message});
  }
})

//Update project
router.patch('/:id', getUser, async (req,res)=> {
  if(req.body.userProjects != null){
    res.user.userProjects = req.body.userProjects
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err){
    res.status(400).json({message: err.message})
  }
})

//User Log in
router.post('/login', async (req,res) => {
  const user = await User.findOne({userName: req.body.userName})
  if(user === null) return res.status(400).send('Cannot find user');
  try {
    if(await bcrypt.compare(req.body.userPassword, user.userPassword)){
      res.send(user.userId)
    } else {
      res.send('Not Allowed')
    }
  } catch(err) {
    console.log(err.message)
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