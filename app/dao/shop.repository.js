const db = require("../models");
const shop = db.shop;
const { QueryTypes } = require('sequelize');
var sequelize = db.sequelize;


module.exports={
    create_shop,
    is_already_created_shop
}

async function create_shop(object_shop){

    return await shop.create(object_shop).then(data=>{
        return data
    }).catch(err=>{
        console.log(err);
        return null;
    });
 
}


async function is_already_created_shop(userId,shopName){

    const objects = await sequelize.query( 'SELECT count(id) as count FROM Shops  WHERE userId =? and shopName=?',{
        replacements: [userId,shopName],
        type: QueryTypes.SELECT
      }
    );
    return Number( objects[0].count);
  
  }