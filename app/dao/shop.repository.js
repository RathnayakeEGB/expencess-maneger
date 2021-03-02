const db = require("../models");
const shop = db.shop;
const { QueryTypes } = require('sequelize');
var sequelize = db.sequelize;


module.exports={
    create_shop,
    is_already_created_shop,
    find_all_shops_for_user,
    shop_findById_for_user,
    shop_findByName_for_user
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

  
async function find_all_shops_for_user(userId){

    const objects = await sequelize.query( 'SELECT * FROM Shops  WHERE userId =?',{
        replacements: [userId],
        type: QueryTypes.SELECT
      }
    );
    return objects;
  
  }

  async function shop_findById_for_user(id ,userId){

    const objects = await sequelize.query( 'SELECT * FROM Shops  WHERE userId =? AND  id=?',{
        replacements: [userId,id],
        type: QueryTypes.SELECT
      }
    );
    return objects;
  
  }

  async function shop_findByName_for_user(name ,userId){

    const objects = await sequelize.query( 'SELECT * FROM Shops  WHERE userId =? AND  shopName=?',{
        replacements: [userId,name],
        type: QueryTypes.SELECT
      }
    );
    return objects;
  
  }