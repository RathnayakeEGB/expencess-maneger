module.exports = (sequelize, Sequelize) => {
    const category = sequelize.define("Categories", {
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
    return category;
  };