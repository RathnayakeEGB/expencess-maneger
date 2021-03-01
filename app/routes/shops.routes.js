module.exports = app => {
    const account_controller = require("../controllers/shops.controller");
  
    var router = require("express").Router();
  
    router.post("/create", account_controller.create);

    app.use('/shops', router);
  };