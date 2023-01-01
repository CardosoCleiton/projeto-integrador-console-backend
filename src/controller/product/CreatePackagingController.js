const { CreatePackagingService } = require("../../services/product/CreatePackagingService");

class CreatePackagingController{
   async handle(request, response){

      const { 
         weight,
         format,
         length,
         width,
         height,
         diameter
      } = request.body;

      const createPackagingService = new CreatePackagingService();
      const packaging = await createPackagingService.execute({
         weight,
         format,
         length,
         width,
         height,
         diameter
      });

      return response.status(201).json(packaging);

   }
}

module.exports = { CreatePackagingController }