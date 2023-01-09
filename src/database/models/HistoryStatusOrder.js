const { sequelize } = require("../sequelize");
const { DataTypes } = require("sequelize");

const HistoryStatusOrder = sequelize.define("history_status_order", {
   id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
   },
   status: {
      type: DataTypes.STRING,
      allowNull: false
   },
   description: {
      type: DataTypes.TEXT,
      allowNull: false
   },
   date_status: {
      type: DataTypes.DATE,
      allowNull: false
   }
});

module.exports = { HistoryStatusOrder }