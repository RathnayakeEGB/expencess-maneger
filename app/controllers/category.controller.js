// const express = require('express');
// const router = express.Router();
const categoryService = require('../services/category.service');
const { static } = require('express');
const err_500 ={
    status:500,
    display:'Internal Server Error.',
    data:null
}



exports.create =async(req, res, next)=>{
  
    let obj =req.body;
    obj.userId =req.user;

    categoryService.create_category(obj).then(data=>{
        return res.send(data);
    }).catch(err=>{
        console.log('Err___ ',err);
        return res.status(500).send(err_500);
    })

};

exports.delete =async(req, res, next)=>{
  
    const categoryId = req.params.categoryId;
    const levelCode = req.params.levelCode;

    categoryService.delete_category({categoryId,levelCode}).then(data=>{
        return res.status(200).send(data);
    }).catch(err=>{
        console.log('Err___ ',err);
        return res.status(500).send(err_500);
    })

};

exports.get_all_categories =async(req, res, next)=>{

    let obj =req.body;
    userId =req.user.id;

    console.log("Calling.....");

    categoryService.get_all_categories_for_user(userId).then(data=>{
        return res.status(200).send({
            status:200,
            display:'Success',
            data:data
        });
    }).catch(err=>{
        console.log('Err___ ',err);
        return res.status(500).send(err_500);
    })

};

exports.update_category =async(req, res, next)=>{

    categoryService.update_categories_items(req.body).then(data=>{
        return res.status(200).send({
            status:200,
            display:'Success',
            data:data
        });
    }).catch(err=>{
        console.log('Err___ ',err);
        return res.status(500).send(err_500);
    })

};