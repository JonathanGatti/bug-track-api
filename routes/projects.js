const express = require('express');
const router = express.Router();
const Project = require('../models/projects');

// Get all projects
router.get('/', async (req,res)=> {
  try {
    const projects = await Project.find()
    res.json(projects)
  } catch (err){
    res.status(500).json({message: err.message})
  }
})
//Get one projects
router.get('/:id', getProject, (req,res)=> {
  res.json(res.project)
})
//Create project
router.post('/', async (req,res)=> {
  const project = new Project({
    projectName: req.body.projectName,
    teamMembers: req.body.teamMembers,
    projectId: req.body.projectId,
    text: req.body.text,
    value: req.body.value
  })
  try {
    const newProject = await project.save()
    res.status(201).json(newProject);
  } catch (err){
    res.status(400).json({message : err.message});
  }
})

//Update project
router.patch('/:id', getProject, async (req,res)=> {
  if(req.body.teamMembers != null){
    res.project.teamMembers = req.body.teamMembers
  }
  if(req.body.projectName != null){
    res.project.projectName = req.body.projectName
  }
  try {
    const updatedProject = await res.project.save();
    res.json(updatedProject);
  } catch (err){
    res.status(400).json({message: err.message})
  }
})

//Delete project
router.delete('/:id', getProject, async (req,res)=> {
  try {
    await res.project.remove();
    res.json({message: 'Project deleted'})
  } catch(err){
    res.status(500).json({message: err.message})
  }
})

async function getProject(req, res, next) {
  try {
    project = await Project.findById(req.params.id);
    if(project === null){
      return res.status(404).json({message: 'Cannot find project'})
    }
  } catch(err) {
    return res.status(500).json({message : err.message})
  }
  res.project = project;
  next()
}

module.exports = router;