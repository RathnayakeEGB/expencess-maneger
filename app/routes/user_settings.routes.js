module.exports = app => {
    const userSettings = require("../controllers/user_settings.controller");
  
    var router = require("express").Router();
  
    router.post("/create", userSettings.create);
  
    router.get("/find-all", userSettings.findAll);
  
    router.get("/published", userSettings.findAllPublished);
  
    router.get("/findBy/:id", userSettings.findOne);
  
    router.put("/:id", userSettings.update);
  
    router.delete("/:id", userSettings.delete);
  
    router.delete("/", userSettings.deleteAll);
  
    app.use('/api/user-settings', router);
  };