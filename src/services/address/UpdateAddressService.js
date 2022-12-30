const { Address } = require("../../database/models/Address");
const { AppError } = require("../../error/AppError");

class UpdateAddressService{
   async execute({
      type,
      cep,
      street,
      district,
      city,
      state,
      number,
      complement
   }, id){
      console.log("Chegou no serviço");
      const mandatoryProperties = {type, cep, street, district, city, state};

      Object.keys(mandatoryProperties).forEach(property => {
         if(!mandatoryProperties[property]){
            throw new AppError(`O campo ${property} é obrigatório!`);
         }
      });

      const addressAlreadyExists = await Address.findByPk(id);

      if(!addressAlreadyExists){
         throw new AppError("Endereço não encontrado!");
      }

      await Address.update({
         type,
         cep,
         street,
         district,
         city,
         state,
         number,
         complement
      }, {
         where: {
            id
         }
      });

      const newAddress = await Address.findByPk(id);

      return newAddress;
   }
}

module.exports = { UpdateAddressService }