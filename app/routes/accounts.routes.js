
module.exports = app => {
    const account_controller = require("../controllers/accounts.controller");
  
    var router = require("express").Router();
  
    router.post("/create", account_controller.create);

    router.get('/all-accounts',account_controller.find_all);

    router.get('/find-account-by/:id',account_controller.find_by_id);

    router.get('/find-account-by-name/:name',account_controller.account_find_by_name)

    app.use('/accounts', router);
  };