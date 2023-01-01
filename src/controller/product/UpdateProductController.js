const { UpdateProductService } = require("../../services/product/UpdateProductService");

class UpdateProductController{
   async handle(request, response){
      const {
         name,
         description,
         price,
         weight
      } = request.body;

      const { id } = request.params;

      const updateProductService = new UpdateProductService();
      const newProduct = await updateProductService.execute({
         name,
         description,
         price,
         weight
      }, id);

      return response.json(newProduct);
   }
}

module.exports = { UpdateProductController }