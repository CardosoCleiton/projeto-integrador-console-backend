const { ListAllCategoryService } = require("../../services/category/ListAllCategoryService");

class ListAllCategoryController{
   async handle(request, response){
      const listAllCategoryService = new ListAllCategoryService();
      const categories = await listAllCategoryService.execute();
      return response.json(categories);
   }
}

module.exports = { ListAllCategoryController }