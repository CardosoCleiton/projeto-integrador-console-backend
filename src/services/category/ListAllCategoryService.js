const { Category } = require("../../database/models/Category");

class ListAllCategoryService{
   async execute(){
      const categories = await Category.findAll();
      return categories;
   }
}

module.exports = { ListAllCategoryService }