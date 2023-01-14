const { ListProductsByCategoryService } = require("../../services/product/ListProductsByCategoryService");

class ListProductsByCategoryController{
   async handle(request, response){
      const { slug } = request.params;
      const { limit, page } = request.query;
      const listProductsByCategoryService = new ListProductsByCategoryService();
      const products = await listProductsByCategoryService.execute({slug, limit, page});
      return response.json(products);
   }
}

module.exports = { ListProductsByCategoryController }