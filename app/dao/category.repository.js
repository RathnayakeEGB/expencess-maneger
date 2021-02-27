const db = require("../models");
const category = db.category;
const subCategory =db.subCategory;
const items =db.items;
const { QueryTypes } = require('sequelize');
const { users } = require("../models");
var sequelize = db.sequelize;


module.exports={
    create_level_one_category,
    create_level_two_category,
    create_items,
    delete_category_one,
    hasSubCategory,
    hasItems,
    delete_category_two
}

async function create_level_one_category(category_obj){

 return await category.create(category_obj).then((obj) => {
     return obj.dataValues;
   }).catch((err) => {
     console.log(err);
     return 500;
   })

}

async function create_level_two_category(category_obj){

  return await subCategory.create(category_obj).then((obj) => {
      return obj.dataValues;
    }).catch((err) => {
      console.log(err);
      return 500;
    })
 
 }

 async function create_items(category_obj){

  return await items.create(category_obj).then((obj) => {
      return obj.dataValues;
    }).catch((err) => {
      console.log(err);
      return 500;
    })
 
 }

 async function delete_category_one(id){

  return await category.destroy({where:{id:id}}).then((obj) => {
      return obj.dataValues;
    }).catch((err) => {
      console.log(err);
      return 500;
    })
 
 }

 async function delete_category_two(id){

  return await subCategory.destroy({where:{id:id}}).then((obj) => {
      return obj.dataValues;
    }).catch((err) => {
      console.log(err);
      return 500;
    })
 
 }

 async function hasSubCategory (id) {

  const count = await sequelize.query( 'SELECT count(id) as count FROM Sub_Categories WHERE categoryId = ?',{
       replacements: [id],
       type: QueryTypes.SELECT
     }
   );
   return Number( count[0].count);
}

async function hasItems (id) {

  const count = await sequelize.query( 'SELECT count(id) as count FROM Items WHERE subCategoryId = ?',{
       replacements: [id],
       type: QueryTypes.SELECT
     }
   );
   return Number( count[0].count);
}