const config = require("../../config.json");
const jwt = require("jsonwebtoken");
const userRepository = require("../dao/user.repository");
const categoryRepository = require("../dao/category.repository");
const db = require("../models");
const usersMgt = db.users;
const bcrypt = require('bcrypt')

module.exports = {
  authenticate,
  registration
};

async function authenticate({ username, password }) {

  try {
    
   let jwtObj =  await userRepository.findUserByEmail(username);
   if(!jwtObj){
    return "Unauthorized Action .1"; // change
   }

   if(!hashPassword(password,jwtObj.password)){
     return "Unauthorized Action ."; // change
   }

   let obj = {
    email: jwtObj.email,
    firstName: jwtObj.firstName,
    lastName: jwtObj.lastName,
    id:jwtObj.id
  }
  const token = jwt.sign(obj, config.secret, {});
  return {token};

  } catch (error) {
    console.log(error);
    return null;
  }
  
}

async function registration(user) {

  try {

    const count = await userRepository .isEmailUsed(user.email);

    if (count > 0) {
      return "Email already used.";
    }

    if (!user.userName) {
      return "Username not found.";
    }

    if (!user.email) {
      return "email not found.";
    }
    if (!user.firstName) {
      return "email not found."; 
    }

    if (!user.lastName) {
      return "email not found.";
    }

    let password_en =await encrypted(user.password);
    const u = {
      userName: user.userName,
      email: user.email,
      password: password_en,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      authType: user.authType,
      updatedDate: user.updatedDate,
    };

    let returnObj = await userRepository.createUser(u);

    if(user.isDefault==='Y'){
      let categories = config.categories;

        for (let index = 0; index < categories.length; index++) {
          
          let level_one =categories[index];
          level_one.userId =returnObj.id;
          let category = await  categoryRepository.create_level_one_category(level_one);

            if(categories[index].subcategories!=undefined){

                for (let i = 0; i < categories[index].subcategories.length; i++) {
                
                  let subCategory  =  categories[index].subcategories[i];
                  subCategory.userId =returnObj.id;
                  subCategory.categoryId =category.id;
                  let categoryTwo = await  categoryRepository.create_level_two_category(subCategory);

                    if(categories[index].subcategories[i].items!=undefined){

                        for (let j = 0; j < categories[index].subcategories[i].items.length; j++) {
                          let item =categories[index].subcategories[i].items[j];
                          item.userId =returnObj.id;
                          item.subCategoryId =categoryTwo.id;
                          let k = await categoryRepository.create_items(item);
                        }

                    }
    
                }
            }

        }

     }

     return returnObj;
    
  } catch (error) {
    console.log("Error-->> ",error);
    return 500;
  }

}

async function encrypted(password) {

  const salt = await bcrypt.genSalt(100);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function hashPassword(password, password2) { // updated
  const salt = await bcrypt.genSalt(100)
  const hash = await bcrypt.hash(password, salt)
  const isSame = await bcrypt.compare(password2, hash) // updated
  return isSame;
  
}