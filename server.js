const express = require('express');
const helmet= require('helmet');
const server= express();

server.use(express.json());

server.get('/', (req,res) =>{
    res.send(`server up`)
})

module.exports = server;