const { DataTypes } = require('sequelize');
const { sequelize } = require("../sequelize");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  name: {
   type: DataTypes.STRING,
   allowNull: false
  },
  email: {
   type: DataTypes.STRING,
   allowNull: false,
   unique: true
  },
  password: {
   type: DataTypes.STRING,
   allowNull: false
  },
  cpf: {
   type: DataTypes.STRING,
   allowNull: true,
   unique: true
  },
  birth_date: {
   type: DataTypes.DATE,
   allowNull: false
  }
});

module.exports = { User }