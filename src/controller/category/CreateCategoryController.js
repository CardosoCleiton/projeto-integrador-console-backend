const { CreateCategoryService } = require("../../services/category/CreateCategoryService");

class CreateCategoryController{
   async handle(request, response){
      const { name, plural_name } = request.body;
      const icon = request.file.filename;
      const createCategoryService = new CreateCategoryService();
      const category = await createCategoryService.execute({name, plural_name, icon});
      return response.status(201).json(category);
   }
}

module.exports = { CreateCategoryController }