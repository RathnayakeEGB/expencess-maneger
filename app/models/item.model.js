module.exports = (sequelize, Sequelize) => {
    const item = sequelize.define("Items", {
      itemName: {
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
      updatedDate: {
        type: Sequelize.STRING
      }
      ,
      updatedBy: {
        type: Sequelize.STRING
      }
    });
    return item;
  };