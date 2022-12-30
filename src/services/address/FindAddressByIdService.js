const { Address } = require("../../database/models/Address");
const { AppError } = require("../../error/AppError");

class FindAddressByIdService{
   async execute(id, userId){

      const address = await Address.findOne({
         where: {
            id,
            userId
         }
      });

      if(!address){
         throw new AppError("Não foi encontrado nenhum endereço para o ID informado.");
      }

      return address;
   }
}

module.exports = { FindAddressByIdService }