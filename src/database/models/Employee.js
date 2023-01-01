const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../sequelize");

const Employee = sequelize.define("employee", {
   id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
   },
   contract_date: {
      type: DataTypes.DATE,
      allowNull: false
   }
});

module.exports = { Employee }