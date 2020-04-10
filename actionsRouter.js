const express = require('express');
const router = express.Router();
const Actions = require('./data/helpers/actionModel.js');
const Projects = require('./data/helpers/projectModel.js');

router.get('/', (req, res)=>{
    try{
        Actions.get().then(response => res.send(response))
    }catch {
        res.status(500).json({message: "an error has occurred"})
    }
})
 
router.get('/:id', validateActionId, (req,res) =>{
    res.status(200).json(req.action)
})

router.put('/:id', (req, res) =>{
    try{
        const id = req.params.id;
        const project = Actions.update(id, {
            notes: req.body.notes,
            description: req.body.description
        });
        res.status(200).json(project)
    } catch {
        res.status(500).json({ message: 'an error has occurred'})
    }
})

router.delete('/:id', validateActionId, async (req, res) => {
    try{
        const id= req.params.id;
        const deleteAction=  await Actions.remove(id);
        if (deleteAction) res.status(200).json({message: "action deleted"})
    } catch{
        res.status(500).json({message: 'an error has occurred.'})
    }
})


//mid

async function validateActionId(req, res, next) {
    try {
      const action = await Actions.get(req.params.id);
      req.action = action;
  
      action
        ? next()
        : res
            .status(404)
            .json({ message: "action with that ID was not found." });
    } catch {
      res.status(500).json({
        error:
          "There was an error while attempting to fetch the action with that ID"
      });
    }
  }
module.exports = router;