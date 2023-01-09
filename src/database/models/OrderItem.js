const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const OrderItem = sequelize.define("order_item", {
   id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
   },
   quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   total_price_items: {
      type: DataTypes.FLOAT,
      allowNull: false
   },
   total_price_freight: {
      type: DataTypes.FLOAT,
      allowNull: false
   },
   unit_purchase_price: {
      type: DataTypes.FLOAT,
      allowNull: false
   },
   unit_price_freight: {
      type: DataTypes.FLOAT,
      allowNull: false
   }
});

module.exports = { OrderItem }