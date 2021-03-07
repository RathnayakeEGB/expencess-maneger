const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require('./app/_helpers/jwt');
const errorHandler = require('./app/_helpers/error-handler');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());

const db = require("./app/models");
db.sequelize.sync();

require('./app/routes/users.routes')(app);
require("./app/routes/user_settings.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/accounts.routes")(app);
require("./app/routes/shops.routes")(app);
app.use(errorHandler);
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;