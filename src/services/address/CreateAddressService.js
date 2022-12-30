const { Address } = require("../../database/models/Address");
const { v4: uuidV4 } = require("uuid");
const { AppError } = require("../../error/AppError");

class CreateAddressService{
   async execute({
      type,
      cep,
      street,
      district,
      city,
      state,
      number,
      complement
   }, userId){

      const mandatoryProperties = {type, cep, street, district, city, state};

      Object.keys(mandatoryProperties).forEach(property => {
         if(!mandatoryProperties[property]){
            console.log(property);
            throw new AppError(`O campo ${property} é obrigatório!`);
         }
      });

      const countAllAddress = await Address.count({
         where: {
            userId
         }
      });
      
      if(countAllAddress >= 3){
         throw new AppError("Você já cadastrou o limite de endereços permitidos!");
      }

      const id = uuidV4();

      const address = await Address.create({
         id,
         type,
         cep,
         street,
         district,
         city,
         state,
         number,
         complement,
         userId
      });

      return address;

   }
}

module.exports = { CreateAddressService }