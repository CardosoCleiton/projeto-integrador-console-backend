const { AppError } = require("../../error/AppError");
const { CalculateProductFreightService } = require("../../services/product/CalculateProductFreightService");

class CalculateProductFreightController{
   async handle(request, response){
      const { id } = request.params;
      const { zip } = request.body;

      if(!zip){
         throw new AppError("Obrigatório informar um CEP");
      }

      const calculateProductFreightService = new CalculateProductFreightService();
      const freight = await calculateProductFreightService.execute(id, zip);

      return response.json(freight);
   }
}

module.exports = { CalculateProductFreightController }