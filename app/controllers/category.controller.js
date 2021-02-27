const express = require('express');
const router = express.Router();
const categoryService = require('../services/category.service');
var axios = require('axios');
const { static } = require('express');
const err_500 ={
    status:500,
    display:'Internal Server Error.',
    data:null
}



exports.create =async(req, res, next)=>{
  
    let obj =req.body;
    obj.userId =req.user;
    console.log('CCC->>> ');

    // validation part should be done here
    categoryService.create_category(obj).then(data=>{
        console.log('CCC->>> ',data);
        return res.status(200).send(data);
    }).catch(err=>{
        console.log('Err___ ',err);
        return res.status(500).send(err_500);
    })

};

exports.delete =async(req, res, next)=>{
  
    const categoryId = req.params.categoryId;
    const levelCode = req.params.levelCode;

    console.log('Calling',levelCode);

    categoryService.delete_category({categoryId,levelCode}).then(data=>{
        console.log('CCC->>> ',data);
        return res.status(200).send(data);
    }).catch(err=>{
        console.log('Err___ ',err);
        return res.status(500).send(err_500);
    })

};
