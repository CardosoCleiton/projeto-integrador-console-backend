const { FindAddressByIdService } = require("../../services/address/FindAddressByIdService");

class FindAddressByIdController{
   async handle(request, response){
      const { id } = request.params;
      const { id: userId } = request.user;

      const findAddressByIdService = new FindAddressByIdService();
      const address = await findAddressByIdService.execute(id, userId);

      return response.json(address);

   }
}

module.exports = { FindAddressByIdController }