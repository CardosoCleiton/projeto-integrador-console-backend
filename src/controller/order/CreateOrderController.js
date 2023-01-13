const { CreateOrderService } = require("../../services/order/CreateOrderService");

class CreateOrderController{
   async handle(request, response){
      const { paymentData, orderItems, freight } = request.body;
      const { id } = request.user;
      const createOrderService = new CreateOrderService();
      const order = await createOrderService.execute(paymentData, orderItems, freight, id);
      return response.status(201).json(order);
   }
}

module.exports = { CreateOrderController }