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

      if(properties.width < 10 || properties.width > 100){
         throw new AppError("A largura mínima do pacote é de 10cm e a máxima é de 100cm");
      }

      if(properties.length < 15 || properties.length > 100){
         throw new AppError("O comprimento mínimo do pacote é de 15cm e o máximo é de 100cm");
      }

      if(properties.height < 1 || properties.height > 100){
         throw new AppError("A altura mínima do pacote é de 1cm e a máxima é de 100cm");
      }

      if (properties.width + properties.length + properties.height > 200 ) {
      throw new AppError("A soma resultante do comprimento + largura + altura não deve superar 200cm");
      }

      const id = uuidV4();

      const packaging = await Packaging.create({
         id,
         ...properties
      });

      return packaging;

   }
}

module.exports = { CreatePackagingService }