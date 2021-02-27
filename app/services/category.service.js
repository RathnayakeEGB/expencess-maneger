const express = require("express");
const router = express.Router();
const categoryRepo = require("../dao/category.repository");

module.exports = {
  create_category,
  delete_category,
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

  console.log("OBJ-->> XXX", categoryId);
  if (levelCode == 1) {
    obj = await categoryRepo.hasSubCategory(categoryId) .then((data) => {
        if (data > 0) {
          return {
            status: 400,
            display: "Category In a Relationship.",
            data: null,
          };
        } else {
          return categoryRepo.delete_category_one(categoryId).then((data) => {
              return data;
            }) .catch((err) => {
              console.log(err);
            });
        }
      }) .catch((err) => {
        console.log(err);
      });
  } else if (levelCode == 2) {

    obj = await categoryRepo.hasItems(categoryId).then(data=>{

      if (data > 0) {
        return {
          status: 400,
          display: "Sub Category In a Relationship.",
          data: null,
        };
      } else {
        return categoryRepo.delete_category_two(categoryId).then((data) => {
            return data;
          }) .catch((err) => {
            console.log(err);
          });
      }

    }).catch(err=>{
      console.log(err);
    })


  } else {
  }
  return obj;
}
