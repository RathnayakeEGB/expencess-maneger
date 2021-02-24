module.exports = (sequelize, Sequelize) => {
    const Setting = sequelize.define("settings", {
      settingName: {
        type: Sequelize.STRING,
         allowNull: false
      },
      settingValue: {
        type: Sequelize.STRING,
        allowNull: false
      },
      searchKey: {
        type: Sequelize.STRING

      }
    });
    return Setting;
  };