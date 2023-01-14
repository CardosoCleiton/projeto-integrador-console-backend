const { Product } = require("../../database/models/Product");
const { AppError } = require("../../error/AppError");
const { ImageProduct } = require("../../database/models/ImageProduct");

class FindProductByIdService{
   async execute(id){
      const product = await Product.findOne({
         attributes: ["id", "name", "description", "price", "createdAt", "updatedAt", "packagingId", "categoryId"],
         where: {
            id
         },
         include: [{
            model: ImageProduct,
            attributes: ["id", "name"]
         }]
      });
   
      if(!product){
         throw new AppError(`Erro ao localizar produto.`, 404);
      }
   
      return product;
   }
}

module.exports = { FindProductByIdService }