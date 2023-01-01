const { v4: uuidV4 } = require("uuid");
const slugify = require("slugify");
const { Category } = require("../../database/models/Category");

class CreateCategoryService{
   async execute(name){
      const id = uuidV4();
      const slug = slugify(name);

      const category = Category.create({
         name,
         id,
         slug
      });

      return category;
   }
}

module.exports = { CreateCategoryService }