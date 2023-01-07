const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Order = sequelize.define("order", {
   id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
   },
   date_request: {
      type: DataTypes.DATE,
      allowNull: false
   },
   payment_status: {
      type: DataTypes.STRING,
      allowNull: false
   },
   payment_status_detail: {
      type: DataTypes.STRING,
      allowNull: false
   },
   payment_date_approved: {
      type: DataTypes.DATE,
      allowNull: false
   },
   payment_method_id: {
      type: DataTypes.STRING,
      allowNull: false
   },
   payment_type_id: {
      type: DataTypes.STRING,
      allowNull: false
   }
});

module.exports = { Order }