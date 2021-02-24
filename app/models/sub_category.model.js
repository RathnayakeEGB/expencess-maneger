module.exports = (sequelize, Sequelize) => {
    const subCategory = sequelize.define("Sub_Categories", {
      categoryName: {
        type: Sequelize.STRING,
         allowNull: false
      },
      isDefault: {
        type: Sequelize.STRING,
        allowNull: false
      },
      icon: {
        type: Sequelize.STRING
      },
      icon: {
        type: Sequelize.STRING
      }
      ,
      categoryType: {
        type: Sequelize.STRING
      },
      updatedDate: {
        type: Sequelize.STRING
      }
      ,
      updatedBy: {
        type: Sequelize.STRING
      }
    });
    return subCategory;
  };