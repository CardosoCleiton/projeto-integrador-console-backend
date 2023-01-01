const { CreateProductService } = require("../../services/product/CreateProductService");

class CreateProductController{
   async handle(request, response){

      const {
         name,
         description,
         price,
         packagingId,
         categoryId,
         weight
      } = request.body;

      const { id: employeeId } = request.employee;

      const createProductService = new CreateProductService();
      const product = await createProductService.execute({
         name,
         description,
         price,
         packagingId,
         categoryId,
         weight,
         employeeId
      });

      return response.status(201).json(product);

   }
}

module.exports = { CreateProductController }