const db = require("../models");
const userSettings = db.userSettings;
var Sequelize = require('sequelize');
var sequelize = db.sequelize;

exports.create = (req, res,next) => {

  console.log("Body ",req.body);

    if(!req.body.settingName){

        res.status(400).send({
            message: "Settings Name Not Found" +req.body.settingName
          });
          return;
    }
    if(!req.body.settingValue){

        res.status(400).send({
            message: "Settings Value Not Found"
          });
          return;
    }

    if(!req.body.searchKey){

        res.status(400).send({
            message: "Search Key Not Found"
          });
          return;
    }

    const us = {
        settingName: req.body.settingName,
        settingValue: req.body.settingValue,
        searchKey: req.body.searchKey,
      };

      userSettings.create(us).then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

  userSettings.findAll().then(data=>{

    res.send(data);

  }).catch(err=>{
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Tutorial."
    });
  })

  
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {

  if(!req.params.id){

    res.status(400).send({
        message: "Id Not Found" +req.body.setting_name
      });
      return;
  }

  userSettings.findByPk(req.params.id).then(data=>{

    res.status(500).send(data);

  }).catch(err=>{
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Tutorial."
    });
  })

  
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};