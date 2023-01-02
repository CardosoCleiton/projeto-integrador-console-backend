const { Product } = require("../../database/models/Product");
const { AppError } = require("../../error/AppError");

class FindProductByIdService{
   async execute(id){
      const product = await Product.findByPk(id);
   
      if(!product){
         throw new AppError(`Não foi encontrado nenhum produto com o ID ${id}.`);
      }
   
      return product;
   }
}

module.exports = { FindProductByIdService }