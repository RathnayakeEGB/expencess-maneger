const db = require("../models");
const account = db.account;;
const { QueryTypes } = require('sequelize');
var sequelize = db.sequelize;

module.exports={
    create_new_bank_account,
    get_all_accounts,
    is_already_created_account,
    account_find_by_id_for_user,
    account_find_by_name_for_user
}

async function create_new_bank_account(object_account){

  return await account.create(object_account).then(data=>{
        return data
    }).catch(err=>{
        console.log(err);
        return null;
    });

}

async function get_all_accounts(userId){

    const objects = await sequelize.query( 'SELECT * FROM Accounts  WHERE userId =?',{
        replacements: [userId],
        type: QueryTypes.SELECT
      }
    );
    return objects;
  
  }

  async function is_already_created_account(userId,accountName){

    const objects = await sequelize.query( 'SELECT count(id) as count FROM Accounts  WHERE userId =? and accountName=?',{
        replacements: [userId,accountName],
        type: QueryTypes.SELECT
      }
    );
    return Number( objects[0].count);
  
  }

  
  async function account_find_by_id_for_user(id,userId){

    const object = await sequelize.query( 'SELECT * FROM Accounts  WHERE userId =? and id=?',{
        replacements: [userId,id],
        type: QueryTypes.SELECT
      }
    );
    return object;
  
  }

  async function account_find_by_name_for_user(userId,accountName){

    const object = await sequelize.query( 'SELECT * FROM Accounts  WHERE userId =? and accountName=?',{
        replacements: [userId,accountName],
        type: QueryTypes.SELECT
      }
    );
    return object;
  
  }