const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');
var axios = require('axios');
const { static } = require('express');
const internal_server_err ='Internal Server Error'

const err_500 ={
    status:500,
    display:'Internal Server Error.',
    data:null
}

exports.login =async(req, res, next)=>{
  
   userService.authenticate(req.body).then(u =>{
        res.status(200).send(u);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err_500);
    });
};

exports.registration=async(req, res, next)=>{
   await userService.registration(req.body).then(data=>{
         res.status(200).send(data);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(internal_server_err)
    })
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}