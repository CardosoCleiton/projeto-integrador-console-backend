const { Product } = require("../../database/models/Product");
const { AppError } = require("../../error/AppError");
const { ImageProduct } = require("../../database/models/ImageProduct");
const { Category } = require("../../database/models/Category");

class FindProductByIdService{
   async execute(id){
      const product = await Product.findOne({
         where: {
            id
         },
         include: [
            {
               model: ImageProduct,
               attributes: ["id", "name"]
            },
            {
               model: Category
            }
         ]
      });
   
      if(!product){
         throw new AppError(`Erro ao localizar produto.`, 404);
      }

      product.stock = product.stock > 0 ? true : false;
   
      return product;
   }
}

module.exports = { FindProductByIdService }