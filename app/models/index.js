const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.userSettings = require("./user_settings.models")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.category = require("./category.model")(sequelize, Sequelize);
db.subCategory = require("./sub_category.model")(sequelize, Sequelize);
db.items = require("./item.model")(sequelize, Sequelize);
db.account = require("./account.model")(sequelize, Sequelize);
db.shop = require("./shop.model")(sequelize, Sequelize);
db.transaction = require("./user.transactions.model")(sequelize, Sequelize);



db.userSettings.belongsToMany(db.users, {
  through: "user_settings",
  as: "users",
  foreignKey: "userId",
});
db.users.belongsToMany(db.userSettings, {
  through: "user_settings",
  as: "userSettings",
  foreignKey: "usersSettingsId",
});

db.users.hasMany(db.category, { as: "category" });
db.category.belongsTo(db.users, {
  foreignKey: "id",
  as: "users",
});

db.users.hasMany(db.subCategory, { as: "subCategory" });
db.subCategory.belongsTo(db.users, {
  foreignKey: "id",
  as: "users",
});

db.category.hasMany(db.subCategory, { as: "subCategory" });
db.subCategory.belongsTo(db.category, {
  foreignKey: "id",
  as: "category",
});

db.users.hasMany(db.items, { as: "items" });
db.items.belongsTo(db.users, {
  foreignKey: "id",
  as: "users",
});

db.subCategory.hasMany(db.items, { as: "items" });
db.items.belongsTo(db.subCategory, {
  foreignKey: "id",
  as: "items",
});

db.users.hasMany(db.items, { as: "account" });
db.account.belongsTo(db.users, {
  foreignKey: "id",
  as: "users",
});

db.users.hasMany(db.shop, { as: "shop" });
db.shop.belongsTo(db.users, {
  foreignKey: "id",
  as: "users",
});



db.users.hasMany(db.transaction, { as: "transaction" });
db.transaction.belongsTo(db.users, {
  foreignKey: "id",
  as: "users",
});

db.account.hasMany(db.transaction, { as: "transaction" });
db.transaction.belongsTo(db.account, {
  foreignKey: "id",
  as: "account",
});

db.items.hasMany(db.transaction, { as: "transaction" });
db.transaction.belongsTo(db.items, {
  foreignKey: "id",
  as: "items",
});

db.shop.hasMany(db.transaction, { as: "transaction" });
db.transaction.belongsTo(db.shop, {
  foreignKey: "id",
  as: "shop",
});


module.exports = db;