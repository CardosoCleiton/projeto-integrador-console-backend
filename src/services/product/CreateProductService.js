const { v4: uuidV4 } = require("uuid");
const { Product } = require("../../database/models/Product");
const { Packaging } = require("../../database/models/Packaging");
const { Category } = require("../../database/models/Category");
const { AppError } = require("../../error/AppError");
const { ImageProduct } = require("../../database/models/ImageProduct");

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

      const product = await Product.create({
         id: uuidV4(),
         name: properties.name,
         description: properties.description,
         price: properties.price,
         packagingId: properties.packagingId,
         categoryId: properties.categoryId,
         weight: properties.weight,
         employeeId: properties.employeeId,
         stock: properties.stock
      });

      for(let imageName of properties.files){
         await ImageProduct.create({
            id: uuidV4(),
            name: imageName,
            productId: product.id
         });
      }

      const newProduct = await Product.findOne({
         attributes: ["id", "name", "description", "price", "createdAt", "updatedAt", "packagingId", "categoryId"],
         where: {
            id: product.id
         },
         include: [{
            model: ImageProduct,
            attributes: ["id", "name"]
         }]
      });
   
      return newProduct;

   }
}

module.exports = { CreateProductService }