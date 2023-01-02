const { ListAllProductService } = require("../../services/product/ListAllProductService");

class ListAllProductController{
   async handle(request, response){
      const { limit, page } = request.query;
      const listAllProductService = new ListAllProductService();
      const products = await listAllProductService.execute({limit, page});
      return response.json(products);
   }
}

module.exports = { ListAllProductController }