const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../sequelize");

const Category = sequelize.define("category", {
   id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false
   },
   slug: {
      type: DataTypes.STRING,
      allowNull: false
   }
});

module.exports = { Category }