module.exports = app => {
    const category = require("../controllers/category.controller");
  
    var router = require("express").Router();
  
    router.post("/create", category.create);

    router.delete('/delete/:categoryId/:levelCode',category.delete)
  
    app.use('/category', router);
  };