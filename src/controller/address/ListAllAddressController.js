const { ListAllAddressService } = require("../../services/address/ListAllAddressService");

class ListAllAddressController{
   async handle(request, response){
      const { id } = request.user;

      const listAllAddressService = new ListAllAddressService();
      const allAddress = await listAllAddressService.execute(id);

      return response.json(allAddress);
   }
}

module.exports = { ListAllAddressController }