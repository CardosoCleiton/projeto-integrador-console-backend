const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("console", "root", "Admin@123", {
   host: "localhost",
   dialect: "mysql"
 });

module.exports = { sequelize };