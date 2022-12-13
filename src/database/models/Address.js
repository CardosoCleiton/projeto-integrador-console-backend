const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../sequelize");

const Address = sequelize.define("address", {
   id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
   },
   type: {
      type: DataTypes.STRING,
      allowNull: false
   },
   cep: {
      type: DataTypes.STRING,
      allowNull: false
   },
   street: {
      type: DataTypes.STRING,
      allowNull: false
   },
   district: {
      type: DataTypes.STRING,
      allowNull: false
   },
   city: {
      type: DataTypes.STRING,
      allowNull: false
   },
   state: {
      type: DataTypes.STRING,
      allowNull: false
   },
   number: {
      type: DataTypes.STRING,
      allowNull: true
   },
   complement: {
      type: DataTypes.STRING,
      allowNull: true
   }
});

module.exports = { Address }