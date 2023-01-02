const { FindProductByIdService } = require("../../services/product/FindProductByIdService");

class FindProductByIdController{
   async handle(request, response){
      const { id } = request.params;
      const findProductByIdService = new FindProductByIdService();
      const product = await findProductByIdService.execute(id);
      return response.json(product);
   }
}

module.exports = { FindProductByIdController }