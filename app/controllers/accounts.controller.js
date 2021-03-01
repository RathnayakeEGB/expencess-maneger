const accountService = require('../services/account.service');
const { static } = require('express');

const err_500 ={
    status:500,
    display:'Internal Server Error.',
    data:null
}

exports.create =async(req, res, next)=>{
  
    let obj =req.body;
    obj.userId =req.user.id

    accountService.create_new_account(obj).then(data=>{
        return res.send(data);
    }).catch(err=>{
        console.log('Err___ ',err);
        return res.status(500).send(err_500);
    })

};

exports.find_all =async(req, res, next)=>{
  
    let userId =req.user.id

    accountService.get_all_accounts(userId).then(data=>{
        return res.send(data);
    }).catch(err=>{
        console.log('Err___ ',err);
        return res.status(500).send(err_500);
    })

};

exports.find_by_id =async(req, res, next)=>{
  
    let userId =req.user.id
    const id = req.params.id;

    accountService.account_find_by_id_for_user(id,userId).then(data=>{
        return res.send(data);
    }).catch(err=>{
        console.log('Err___ ',err);
        return res.status(500).send(err_500);
    })

};



exports.account_find_by_name =async(req, res, next)=>{
  
    let userId =req.user.id
    const account_name = req.params.name;

    accountService.account_find_by_name(userId,account_name).then(data=>{
        return res.send(data);
    }).catch(err=>{
        console.log('Err___ ',err);
        return res.status(500).send(err_500);
    })

};