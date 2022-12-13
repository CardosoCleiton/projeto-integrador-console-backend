const { CreateAddressService } = require("../../services/user/CreateAddressService");

class CreateAddressController{
   async handle(request, response){

      const address = request.body;
      const { id } = request.user;

      const createAddressService = new CreateAddressService();
      const responseAddress = await createAddressService.execute(address, id);

      return response.status(201).json(responseAddress);
   }
}

module.exports = { CreateAddressController }