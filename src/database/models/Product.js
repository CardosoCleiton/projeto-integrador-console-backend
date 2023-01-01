const { sequelize } = require("../sequelize");
const { DataTypes } = require("sequelize");

const Product = sequelize.define("product", {
   id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   description: {
      type: DataTypes.TEXT,
      allowNull: false,
   },
   price: {
      type: DataTypes.FLOAT,
      allowNull: false
   },
   weight: {
      type: DataTypes.STRING,
      allowNull: false,
   }
});

module.exports = { Product }