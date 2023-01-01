const { CreateCategoryService } = require("../../services/category/CreateCategoryService");

class CreateCategoryController{
   async handle(request, response){
      const { name } = request.body;
      const createCategoryService = new CreateCategoryService();
      const category = await createCategoryService.execute(name);
      return response.status(201).json(category);
   }
}

module.exports = { CreateCategoryController }