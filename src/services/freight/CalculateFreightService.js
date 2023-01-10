const { Product } = require("../../database/models/Product");
const { Packaging } = require("../../database/models/Packaging");
const { Freight } = require("../../providers/Freight");
const { freightConfig } = require("../../config/config");

class CalculateFreightService{
   async execute(freightData){

      const products = [];
      for(let item of products.items){
         const product = await Product.findOne({
            where: {
               id: item.productId
            },
            include: Packaging
         });
         if(!product){
            throw new AppError(`Não foi encontrado nenhum produto com ID ${item.productId}`);
         }
         products.quantity = item.quantity;
         products.push(product);
      }

      const freight = new Freight();
      const priceFreightProducts = [];

      for(let priceFreightProduct of products){

         const freightInfoSedex = await freight.calculateDeadline({
            sCepOrigem: freightConfig.cepOrigin,
            nCdServico: freightConfig.sedexCode,
            sCepDestino: zip,
            nVlPeso: (parseFloat(priceFreightProduct.weight) + parseFloat(priceFreightProduct.packaging.weight)).toString(),
            nCdFormato: priceFreightProduct.packaging.format,
            nVlComprimento: priceFreightProduct.packaging.length,
            nVlAltura: priceFreightProduct.packaging.height,
            nVlLargura: priceFreightProduct.packaging.width,
            nVlDiametro: priceFreightProduct.packaging.diameter
         });

         if(freightInfoSedex[0].MsgErro){
            throw new AppError(freightInfoSedex[0].MsgErro);
         }

         const priceSedex = {
            type: "Correios - SEDEX",
            typeId: freightConfig.sedexCode,
            price: parsetFloat(freightInfoSedex[0].Valor.replace(",", ".")) * priceFreightProduct.quantity,
            deadline: freightInfoSedex[0].PrazoEntrega
         };
         priceFreightProducts.push(priceSedex);

         const freightInfoPac = await freight.calculateDeadline({
            sCepOrigem: freightConfig.cepOrigin,
            nCdServico: freightConfig.pacCode,
            sCepDestino: zip,
            nVlPeso: (parseFloat(priceFreightProduct.weight) + parseFloat(priceFreightProduct.packaging.weight)).toString(),
            nCdFormato: priceFreightProduct.packaging.format,
            nVlComprimento: priceFreightProduct.packaging.length,
            nVlAltura: priceFreightProduct.packaging.height,
            nVlLargura: priceFreightProduct.packaging.width,
            nVlDiametro: priceFreightProduct.packaging.diameter
         });

         if(freightInfoPac[0].MsgErro){
            throw new AppError(freightInfoPac[0].MsgErro);
         }

         const pricePac = {
            type: "Correios - PAC",
            typeId: freightConfig.pacCode,
            price: parsetFloat(freightInfoPac[0].Valor.replace(",", ".")) * priceFreightProduct.quantity,
            deadline: freightInfoPac[0].PrazoEntrega
         };
         priceFreightProducts.push(pricePac);

      }

      return priceFreightProduct;
   }
}

module.exports = { CalculateFreightService }