const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const account = sequelize.define("Account", {
      accountName: {
        type: Sequelize.STRING,
         allowNull: false
      },
      note: {
        type: Sequelize.STRING,
      },
      accountBalance: {
        type: DataTypes.DOUBLE
      },
      
    });
    return account;
  };