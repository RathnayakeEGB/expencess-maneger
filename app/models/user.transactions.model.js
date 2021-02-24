const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const transaction = sequelize.define("UserTransactions", {
      amount: {
        type: DataTypes.DECIMAL
      },
      transactionType: {
        type: DataTypes.STRING(1),
        allowNull: false
      },
      image: {
        type: DataTypes.BLOB
      },
      transactionDate: {
        type: DataTypes.DATE
      },
      updatedDate: {
        type: Sequelize.STRING
      }
    });
    return transaction;
  };