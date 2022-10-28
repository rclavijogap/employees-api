const Sequelize = require("sequelize");
require('dotenv').config();

const {DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_DIALECT, DB_PORT} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employees = require("./employee.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);

module.exports = db;
