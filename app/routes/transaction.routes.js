
module.exports = app => {
    const transaction_controller = require("../controllers/transaction.controller");
  
    var router = require("express").Router();
  
    router.post("/create", transaction_controller.new_transaction);

    app.use('/transactions', router);
  };