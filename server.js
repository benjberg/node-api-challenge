const express = require('express');
const projectRouter= require('./projectsRouter.js');
const actionRouter= require('./actionsRouter.js');
const helmet= require('helmet');
const server= express();


server.use(helmet());
server.use(express.json());
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);
server.get('/', (req,res) =>{
    res.send(`server up`)
})

module.exports = server;