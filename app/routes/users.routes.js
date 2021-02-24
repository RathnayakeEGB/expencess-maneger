
module.exports = app => {
    const usersController = require("../controllers/users.controller");
  
    var router = require("express").Router();
  
    router.post("/authenticate", usersController.login);

    router.post('/registration',usersController.registration)

    app.use('/users', router);
  };