const { v4: uuidV4 } = require("uuid");
const { Product } = require("../../database/models/Product");
const { Packaging } = require("../../database/models/Packaging");
const { Category } = require("../../database/models/Category");
const { AppError } = require("../../error/AppError");

class CreateProductService{
   async execute(properties){

      Object.keys(properties).forEach(propertie => {
         if(!properties[propertie]){
            throw new AppError(`A propriedade ${propertie} é obrigatória!`);
         }
      });

      //Verifica se o pacote existe:
      const packagingExists = await Packaging.findByPk(properties.packagingId);
      if(!packagingExists){
         throw new AppError("Não foi encontrado nenhum pacote com o ID informado.");
      }

      //Verfica se a categoria existe:
      const categoryExists = await Category.findByPk(properties.categoryId);
      if(!categoryExists){
         throw new AppError("Não foi encontrado nenhuma categoria com o ID informado.");
      }

      const id = uuidV4();

      const product = await Product.create({
         id: id,
         ...properties
      });
   
      return product;

   }
}

module.exports = { CreateProductService }