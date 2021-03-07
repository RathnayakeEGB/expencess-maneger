const db = require("../models");
const transaction = db.transaction;
const { QueryTypes } = require('sequelize');
var sequelize = db.sequelize;


module.exports ={
    create_new_transaction
}

async function create_new_transaction (transaction_obj) {

   let transaction = transaction.create(transaction_obj).then((obj) => {
         return obj;
       }).catch((err) => {
         console.log(err);
         return 500;
       });
     
       return transaction;
}