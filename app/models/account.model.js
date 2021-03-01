const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const account = sequelize.define("Accounts", {
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