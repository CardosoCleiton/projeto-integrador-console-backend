const { AppError } = require("../../error/AppError");
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

      if(!request.files.length > 0){
         throw new AppError("Obrigatório enviar no mínimo 1 imagem do produto!");
      }

      const { id: employeeId } = request.employee;
      const files = request.files.map(file => file.filename);

      const createProductService = new CreateProductService();
      const product = await createProductService.execute({
         name,
         description,
         price,
         packagingId,
         categoryId,
         weight,
         employeeId,
         files
      });

      return response.status(201).json(product);

   }
}

module.exports = { CreateProductController }