const { Product } = require("../../database/models/Product");

class UpdateProductService{
   async execute(properties, id){

      Object.keys(properties).forEach(propertie => {
         if(!properties[propertie]){
            throw new AppError(`A propriedade ${propertie} é obrigatória!`);
         }
      });

      await Product.update({
         name: properties.name,
         description: properties.description,
         price: properties.price,
         weight: properties.weight
      }, {
         where: {
            id
         }
      });

      const product = await Product.findByPk(id);

      return product;

   }
}

module.exports = { UpdateProductService }