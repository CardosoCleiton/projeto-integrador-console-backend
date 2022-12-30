const { UpdateAddressService } = require("../../services/address/UpdateAddressService");

class UpdateAddressController{
   async handle(request, response){
      const address = request.body;
      const { id } = request.params;
      const updateAddressService = new UpdateAddressService();
      const updatedAddress = await updateAddressService.execute(address, id);
      return response.status(201).json(updatedAddress);
   }
}

module.exports = { UpdateAddressController }