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



db.users.hasMany(db.category, { as: "category" ,foreignKey:'userId'});
db.category.belongsTo(db.users, {
  foreignKey: "userId",
  as: "users",
});


db.users.hasMany(db.userSettings, {as: "userSettings" ,foreignKey:'userId'});
db.userSettings.belongsTo(db.users, {
  as: "users",
  foreignKey: "userId",
});



// db.users.hasMany(db.category, { as: "category" });
// db.category.belongsTo(db.users, {
//   foreignKey: "UserId",
//   as: "users",
// });

db.category.hasMany(db.subCategory, { as: "subCategory",foreignKey:'categoryId' });
db.subCategory.belongsTo(db.category, {
  foreignKey: "categoryId",
  as: "category",
});

db.users.hasMany(db.subCategory, { as: "subCategory" ,foreignKey:'userId'});
db.subCategory.belongsTo(db.users, {
  foreignKey: "userId",
  as: "users",
});



db.users.hasMany(db.items, { as: "items"  ,foreignKey:'userId'});
db.items.belongsTo(db.users, {
  foreignKey: "userId",
  as: "users",
});

db.subCategory.hasMany(db.items, { as: "items",foreignKey:'subCategoryId' });
db.items.belongsTo(db.subCategory, {
  foreignKey: "subCategoryId",
  as: "items",
});

db.users.hasMany(db.items, { as: "account",foreignKey:'userId' });
db.account.belongsTo(db.users, {
  foreignKey: "userId",
  as: "users",
});

db.users.hasMany(db.shop, { as: "shop" ,foreignKey:'userId'});
db.shop.belongsTo(db.users, {
  foreignKey: "userId",
  as: "users",
});



db.users.hasMany(db.transaction, { as: "transaction",foreignKey:'userId' });
db.transaction.belongsTo(db.users, {
  foreignKey: "userId",
  as: "users",
});

db.account.hasMany(db.transaction, { as: "transaction" ,foreignKey:'accountId'});
db.transaction.belongsTo(db.account, {
  foreignKey: "accountId",
  as: "account",
});

db.items.hasMany(db.transaction, { as: "transaction",foreignKey:'itemCode' });
db.transaction.belongsTo(db.items, {
  foreignKey: "itemCode",
  as: "items",
});

db.shop.hasMany(db.transaction, { as: "transaction" ,foreignKey:'shopId'});
db.transaction.belongsTo(db.shop, {
  foreignKey: "shopId",
  as: "shop",
});


module.exports = db;