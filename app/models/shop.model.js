const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const shop = sequelize.define("Shops", {
      shopName: {
        type: Sequelize.STRING,
         allowNull: false
      },
      isDefault: {
        type: Sequelize.STRING,
      },
      note: {
        type: DataTypes.STRING
      },
      icon: {
        type: DataTypes.STRING
      }
      
    });
    return shop;
  };