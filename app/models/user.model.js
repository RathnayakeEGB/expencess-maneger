
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("Users", {
      userName: {
        type: Sequelize.STRING,
         allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING

      }
      ,
      firstName: {
        type: Sequelize.STRING

      },
      lastName: {
        type: Sequelize.STRING

      },
      image: {
        type: Sequelize.STRING

      },
      authType: {
        type: Sequelize.STRING

      } ,
      updatedDate: {
        type: Sequelize.STRING
      } 
    });
    return User;
  };