const { v4: uuidV4 } = require("uuid");
const slugify = require("slugify");
const { Category } = require("../../database/models/Category");
const { AppError } = require("../../error/AppError");

class CreateCategoryService{
   async execute(name){
      
      const categoryAlreadyExists = await Category.findOne({
         where: {
            name: name
         }
      });
      
      if(categoryAlreadyExists){
         throw new AppError("Já existe uma categoria com o nome " + name);
      }
      
      const id = uuidV4();
      const slug = slugify(name).toLowerCase();

      const category = await Category.create({
         name,
         id,
         slug
      });

      return category;
   }
}

module.exports = { CreateCategoryService }