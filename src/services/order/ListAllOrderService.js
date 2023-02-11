const { Order } = require("../../database/models/Order");
const { OrderItem } = require("../../database/models/OrderItem");
const { Address } = require("../../database/models/Address");
const { Product } = require("../../database/models/Product");
const { HistoryStatusOrder } = require("../../database/models/HistoryStatusOrder");

class ListAllOrderService{
   async execute(userId){
      try{
         const allOrders = await Order.findAll({
            where: {
               userId
            },
            attributes: ["id", "date_request", "payment_method_id"],
            order: [["date_request", "DESC"]],
            include: [
               {
                  model: OrderItem,
                  attributes: ["quantity", "total_price_items", "total_price_freight", "unit_purchase_price", "unit_price_freight"],
                  include: [
                     {
                        model: Product,
                        attributes: ["id", "name"],
                     } 
                   ]
               },
               {
                  model: Address,
                  attributes: ["id", "cep", "street", "district", "city", "state", "number", "complement"]
               },
               {
                  model: HistoryStatusOrder,
                  attributes: ["status", "description", "date_status"]
               }
            ]
         });
         return allOrders;
      }catch(error){
         console.error(error);
         throw new Error(error);
      }
   }
}

module.exports = { ListAllOrderService }