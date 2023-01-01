const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Packaging = sequelize.define("packaging", {
   id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
   },
   weight: {
      type: DataTypes.STRING,
      allowNull: false
   },
   format: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   length: {
      type: DataTypes.DECIMAL,
      allowNull: false
   },
   width: {
      type: DataTypes.DECIMAL,
      allowNull: false
   },
   height: {
      type: DataTypes.DECIMAL,
      allowNull: false
   },
   diameter: {
      type: DataTypes.DECIMAL,
      allowNull: false
   }
});

module.exports = { Packaging }