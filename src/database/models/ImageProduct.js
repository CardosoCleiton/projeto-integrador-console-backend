const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const ImageProduct = sequelize.define("image_product", {
   id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false
   }
});

module.exports = { ImageProduct }