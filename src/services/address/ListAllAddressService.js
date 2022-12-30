const { Address } = require("../../database/models/Address");

class ListAllAddressService{
   async execute(userId){
      const address = await Address.findAll({
         where: {
            userId
         }
      });
      
      return address;
   }
}

module.exports = { ListAllAddressService }