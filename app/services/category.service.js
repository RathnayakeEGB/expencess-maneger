const express = require("express");
const router = express.Router();
const categoryRepo = require("../dao/category.repository");

module.exports = {
  create_category,
  delete_category,
  get_all_categories_for_user,
  update_categories_items
};

async function create_category(category_obj) {
  let obj = null;

  let convertObject = {
    categoryName: category_obj.name,
    isDefault: "N",
    icon: category_obj.imageId,
    categoryType: category_obj.level,
    updatedDate: null,
    updatedBy: category_obj.userId.id,
    userId: category_obj.userId.id,
    user_id: category_obj.userId.id,
  };

  if (category_obj.level === 1) {
    obj = await categoryRepo
      .create_level_one_category(convertObject)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (category_obj.level === 2) {
    if (!category_obj.parentId) {
      return {
        status: 400,
        display: "Category Id Not Found",
        data: null,
      };
    }
    convertObject.categoryId = category_obj.parentId;
    obj = await categoryRepo
      .create_level_two_category(convertObject)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    convertObject.subCategoryId = category_obj.parentId;
    convertObject.itemName = category_obj.name;
    console.log("X---->>> ", convertObject);
    obj = await categoryRepo
      .create_items(convertObject)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return obj;
}

async function delete_category({ categoryId, levelCode }) {
  obj = null;

  if (levelCode == 1) {
    obj = await categoryRepo
      .hasSubCategory(categoryId)
      .then((data) => {
        if (data > 0) {
          return {
            status: 400,
            display: "Category In a Relationship.",
            data: null,
          };
        } else {
          categoryRepo
            .delete_category_one(categoryId)
            .then((data) => {
              return data;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
      
  } else if (levelCode == 2) {
    obj = await categoryRepo
      .hasItems(categoryId)
      .then((data) => {
        if (data > 0) {
          return {
            status: 400,
            display: "Sub Category In a Relationship.",
            data: null,
          };
        } else {
          return categoryRepo
            .delete_category_two(categoryId)
            .then((data) => {
              return data;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    obj = await categoryRepo
      .hasItems_transactions(categoryId)
      .then((data) => {
        if (data > 0) {
          return {
            status: 400,
            display: "Sub Category In a Relationship.",
            data: null,
          };
        } else {
          categoryRepo
            .delete_items(categoryId)
            .then((data) => {
              return data;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return  {
    status: 2,
    display: "Successfully Deleted.",
    data: null,
  };
}

async function get_all_categories_for_user(userId){

  try {

    const categoriesList =await categoryRepo.get_all_categories_for_user(userId);
   
    for (let index = 0; index < categoriesList.length; index++) {
      let subCategories =  await categoryRepo.get_all_sub_categories_for_category(categoriesList[index].id);
      categoriesList[index].subCategories =subCategories;

      if(categoriesList[index].subCategories!==undefined){
        for (let i = 0; i <categoriesList[index].subCategories.length; i++) {
          let items =  await categoryRepo.get_all_Items_for_sub_category(categoriesList[index].subCategories[i].id);
          categoriesList[index].subCategories[i].items =items;
        }
      }

    }
    return categoriesList
    
  } catch (error) {
    console.log(error);
  }
  return null;
}

async function update_categories_items(category){

  let obj =null;

  try {

    if(!category){
      return{
        status:400,
        display:'Object Not Found For Update.',
        data:null
      }
    }

    if(category.level==1){
      obj=await categoryRepo.update_category(category);
    }else if(category.level==2){
      obj=await categoryRepo.update_sub_category(category);
    }else{
      obj=await categoryRepo.update_items(category);
    }
    return obj;
  } catch (error) {
    console.log(error);
  }
  return null;
}