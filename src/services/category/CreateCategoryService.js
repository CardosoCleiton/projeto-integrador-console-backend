const { v4: uuidV4 } = require("uuid");
const slugify = require("slugify");
const { Category } = require("../../database/models/Category");
const { AppError } = require("../../error/AppError");

class CreateCategoryService{
   async execute({name, plural_name, icon}){
         console.log("Chegou AQUI");
      if(!name){
         throw new Error("Obrigátorio informar um nome para a categoria!");
      }

      if(!plural_name){
         throw new Error("Obrigátorio informar o nome no plural para a categoria!");
      }
      
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
         slug,
         icon_category: icon,
         plural_name
      });

      return category;
   }
}

module.exports = { CreateCategoryService }