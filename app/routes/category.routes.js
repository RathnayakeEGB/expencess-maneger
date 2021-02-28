module.exports = app => {
    const category = require("../controllers/category.controller");
  
    var router = require("express").Router();
  
    router.post("/create", category.create);

    router.delete('/delete/:categoryId/:levelCode',category.delete)

    router.get('/getAll',category.get_all_categories)

    router.put('/update',category.update_category)
  
    app.use('/category', router);
  };