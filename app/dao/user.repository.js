const db = require("../models");
const usersMgt = db.users;
const { QueryTypes } = require('sequelize');
var sequelize = db.sequelize;

module.exports = {
    isEmailUsed,
    findUserByEmail,
    createUser
};



async function isEmailUsed (email) {

    const count = await sequelize.query( 'SELECT count(email) as count FROM Users WHERE email = ?',{
         replacements: [email],
         type: QueryTypes.SELECT
       }
     );
     return Number( count[0].count);
}

async function findUserByEmail (email) {
    console.log('User Name '+email);
    const users = await sequelize.query( 'SELECT * FROM Users WHERE email = ?',{
         replacements: [email],
         type: QueryTypes.SELECT
       }
     );
     return users[0];
}

async function createUser (user) {
 
 usersMgt.create(user).then((obj) => {
   obj.password=null;
    return obj;
  }).catch((err) => {
    console.log(err);
    return 500;
  });

  return user

}

