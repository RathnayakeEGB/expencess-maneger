module.exports = app => {
    const account_controller = require("../controllers/shops.controller");
  
    var router = require("express").Router();
  
    router.post("/create", account_controller.create);

    router.get("/find-all-for-user", account_controller.findAll);

    router.get("/find-by/:id", account_controller.findById);

    router.get("/find-by-shop-name/:name", account_controller.findByShopName);

    app.use('/shops', router);
  };