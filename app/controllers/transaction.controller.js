const transaction_service = require('../services/transaction.service');
const { static } = require('express');

const err_500 ={
    status:500,
    display:'Internal Server Error.',
    data:null
}

exports.new_transaction =async(req, res, next)=>{
  
    let obj =req.body;
    obj.userId =req.user.id

    transaction_service.new_transaction(obj).then(data=>{
        return res.send(data);
    }).catch(err=>{
        console.log('Err___ ',err);
        return res.status(500).send(err_500);
    })

};