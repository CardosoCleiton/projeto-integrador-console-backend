const { AppError } = require("../../error/AppError");
const { v4: uuidV4 } = require("uuid");
const { Packaging } = require("../../database/models/Packaging");

class CreatePackagingService{
   async execute(properties){

      Object.keys(properties).forEach(propertie => {
         if(!properties[propertie]){
            throw new AppError(`A propriedade ${propertie} é obrigátoria!`);
         }
      });

      const id = uuidV4();

      const packaging = await Packaging.create({
         id,
         ...properties
      });

      return packaging;

   }
}

module.exports = { CreatePackagingService }