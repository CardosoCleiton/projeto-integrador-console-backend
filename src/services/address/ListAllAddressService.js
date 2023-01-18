const { Address } = require("../../database/models/Address");
const { AppError } = require("../../error/AppError");

class ListAllAddressService{
   async execute(userId){
      
      const address = await Address.findAll({
         where: {
            userId
         }
      });
      
      if(!address){
         throw new AppError("Nenhum endereço encontrado!");
      }

      return address;
   }
}

module.exports = { ListAllAddressService }