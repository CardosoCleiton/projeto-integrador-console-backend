const { ListAllOrderService } = require("../../services/order/ListAllOrderService");

class ListAllOrderController{
   async handle(request, response){
      const { id } = request.user;
      const listAllOrderService = new ListAllOrderService();
      const orders = await listAllOrderService.execute(id);
      return response.json(orders);
   }
}

module.exports = { ListAllOrderController }