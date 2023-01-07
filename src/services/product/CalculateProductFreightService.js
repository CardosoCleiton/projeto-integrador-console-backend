const { Product } = require("../../database/models/Product");
const { AppError } = require("../../error/AppError");
const { Packaging } = require("../../database/models/Packaging");
const { Freight } = require("../../utils/Freight");
const { freightConfig } = require("../../config/config");

class CalculateProductFreightService{
   async execute(productId, zip){
      const product = await Product.findOne({
         where: {
            id: productId
         },
         include: Packaging
      });

      if(!product){
         throw new AppError("Produto não encontrado");
      }

      const freight = new Freight();
      const freightInfoSedex = await freight.calculateDeadline({
         sCepOrigem: freightConfig.cepOrigin,
         nCdServico: freightConfig.sedexCode,
         sCepDestino: zip,
         nVlPeso: (parseFloat(product.weight) + parseFloat(product.packaging.weight)).toString(),
         nCdFormato: product.packaging.format,
         nVlComprimento: product.packaging.length,
         nVlAltura: product.packaging.height,
         nVlLargura: product.packaging.width,
         nVlDiametro: product.packaging.diameter
      });

      if(freightInfoSedex[0].MsgErro){
         throw new AppError(freightInfoSedex[0].MsgErro);
      }

      const freightInfoPac = await freight.calculateDeadline({
         sCepOrigem: freightConfig.cepOrigin,
         nCdServico: freightConfig.pacCode,
         sCepDestino: zip,
         nVlPeso: (parseFloat(product.weight) + parseFloat(product.packaging.weight)).toString(),
         nCdFormato: product.packaging.format,
         nVlComprimento: product.packaging.length,
         nVlAltura: product.packaging.height,
         nVlLargura: product.packaging.width,
         nVlDiametro: product.packaging.diameter
      });

      if(freightInfoPac[0].MsgErro){
         throw new AppError(freightInfoPac[0].MsgErro);
      }

      const formatResponse = [{
         type: "Correios - SEDEX",
         price: freightInfoSedex[0].Valor,
         deadline: freightInfoSedex[0].PrazoEntrega
      }, {
         type: "Correios - PAC",
         price: freightInfoPac[0].Valor,
         deadline: freightInfoPac[0].PrazoEntrega
      }];

      return formatResponse;

   }
}

module.exports = { CalculateProductFreightService }