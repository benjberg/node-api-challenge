const express = require('express');
const router = express.Router();
const Actions = require('./data/helpers/actionModel.js');
const Projects = require('./data/helpers/projectModel.js');
 

router.get('/', (req,res) =>{
    try{
        Projects.get().then(response => res.send(response))
    }catch {
        res.status(500).json({message: "an error has occurred"})
    }
})
router.get('/:id', validateProjectId, (req,res) => {
    const id = req.params.id;
  try{
    Projects.get(id).then(response => res.send(response));
  } catch{
    res.status(500).json({message: 'an error has occurred'})
  }
})
router.get('/:id/actions', validateProjectId, async (req,res)=>{
    try{
        const id = req.params.id;
        const actions = await Projects.getProjectActions(id);
        actions.length > 0 ? res.status(200).json(actions) : res.status(200).json({ message: 'this project has no actions'});
    } catch {
        res.status(500).json({
            message: "there was an error processing your request"
        })
    }
})

router.put('/:id',  (req, res) => {
    try{
        const id = req.params.id;
        const project= Projects.update(id, {
            name: req.body.name,
            description: req.body.description
        });
        res.status(200).json(project)
    } catch {
        res.status(500).json({ message: 'an error has occurred'})
    }
})

router.post('/', (req, res) =>{
    try{
        const project= Projects.insert({
            name: req.body.name,
            description: req.body.description
        })
        res.status(200).json(project)
    } catch {
        res.status(500)({
            message: "an error has occurred"
        })
    }
})
 router.post('/:id/actions', validateProjectId, (req, res) =>{
     try{
         const action = Actions.insert({
             project_id: req.params.id,
             description: req.body.description,
             notes: req.body.notes
         });
         res.status(200).json(action)
     } catch {
         res.status(500).json({message: 'an error has occurred'})
     }
 })

 router.delete('/:id', validateProjectId, async (req, res) =>{
     try{
         const id = req.params.id;
         const deleteProject =  await Projects.remove(id); 
         if (deleteProject) res.status(200).json({ message: "project deleted"})
     } catch{
         res.status(500).json({ message: 'an error has occurred'})
     }
 })
//mid

async function validateProjectId(req, res, next) {
    try {
      const project = await Projects.get(req.params.id);
      req.project = project;
  
      project
        ? next()
        : res
            .status(404)
            .json({ message: "Project with that ID was not found." });
    } catch {
      res.status(500).json({
        error:
          "There was an error while attempting to fetch the project with that ID"
      });
    }
  }
module.exports = router;
