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
    delete_category_two,
    hasItems_transactions,
    delete_items,
    get_all_categories_for_user,
    get_all_sub_categories_for_category,
    get_all_Items_for_sub_category,
    update_sub_category,
    update_category,
    update_items
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
    console.log('AAA-->>> ', obj);
      return obj;
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

 async function delete_items(id){

  return await items.destroy({where:{id:id}}).then((obj) => {
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

async function hasItems_transactions (id) {

  const count = await sequelize.query( 'SELECT count(id) as count FROM UserTransactions WHERE itemCode = ?',{
       replacements: [id],
       type: QueryTypes.SELECT
     }
   );
   return Number( count[0].count);
}

async function get_all_categories_for_user (id) {

  const object = await sequelize.query( 'SELECT * FROM Categories  WHERE userId =?',{
       replacements: [id],
       type: QueryTypes.SELECT
     }
   );
   return object;
}

async function get_all_sub_categories_for_category (id) {

  const objects = await sequelize.query( 'SELECT * FROM Sub_Categories  WHERE categoryId =?',{
       replacements: [id],
       type: QueryTypes.SELECT
     }
   );
   return objects;
}
async function get_all_Items_for_sub_category (id) {

  const objects = await sequelize.query( 'SELECT * FROM Items  WHERE subCategoryId =?',{
       replacements: [id],
       type: QueryTypes.SELECT
     }
   );
   return objects;
}

async function update_items(object){

  return await items.update(object,{where:{id:object.id}}).then((obj) => {
      return obj;
    }).catch((err) => {
      console.log(err);
      return 500;
    })
 
 }
 async function update_sub_category(object){

  return await subCategory.update(object,{where:{id:object.id}}).then((obj) => {
      return obj;
    }).catch((err) => {
      console.log(err);
      return 500;
    })
 
 }
 async function update_category(object){

  return await subCategory.update(object,{where:{id:object.id}}).then((obj) => {
      return obj;
    }).catch((err) => {
      console.log(err);
      return 500;
    })
 
 }
