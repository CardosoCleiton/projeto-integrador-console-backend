const { Product } = require("../../database/models/Product");
const { Packaging } = require("../../database/models/Packaging");
const { Freight } = require("../../providers/Freight");
const { freightConfig } = require("../../config/config");
const { AppError } = require("../../error/AppError");

class CalculateFreightService{
   async execute(freightData){
      
      const products = [];
      for(let item of freightData.items){

         if(isNaN(item.quantity) || item.quantity < 0){
            throw new AppError("Os valores incluidos como quantidade não são validos.");
         }

         try{
            const product = await Product.findOne({
               where: {
                  id: item.productId
               },
               include: Packaging
            });
            
            if(!product){
               throw new AppError(`Não foi encontrado nenhum produto com ID ${item.productId}`);
            }
   
            product.quantity = item.quantity;
            products.push(product);
         }catch(error){
            throw new AppError("Erro ao buscar produto");
         }
      }
      console.log("Chegou Aqui");
      const freight = new Freight();
      const priceFreightProducts = [];

      for(let priceFreightProduct of products){

         const freightInfoSedex = await freight.calculateDeadline({
            sCepOrigem: freightConfig.cepOrigin,
            nCdServico: freightConfig.sedexCode,
            sCepDestino: freightData.address.zip,
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
            price: parseFloat(freightInfoSedex[0].Valor.replace(",", ".")) * priceFreightProduct.quantity,
            deadline: freightInfoSedex[0].PrazoEntrega
         };

         const indexSedex = priceFreightProducts.findIndex(element => element.typeId === priceSedex.typeId);
         if(indexSedex >= 0){
            priceFreightProducts[indexSedex].price = priceFreightProducts[indexSedex].price + priceSedex.price;
         }else{
            priceFreightProducts.push(priceSedex);
         }

         const freightInfoPac = await freight.calculateDeadline({
            sCepOrigem: freightConfig.cepOrigin,
            nCdServico: freightConfig.pacCode,
            sCepDestino: freightData.address.zip,
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
            price: parseFloat(freightInfoPac[0].Valor.replace(",", ".")) * priceFreightProduct.quantity,
            deadline: freightInfoPac[0].PrazoEntrega
         };

         const indexPac = priceFreightProducts.findIndex(element => element.typeId === pricePac.typeId);
         if(indexSedex >= 0){
            priceFreightProducts[indexPac].price = priceFreightProducts[indexPac].price + pricePac.price;
         }else{
            priceFreightProducts.push(pricePac);
         }
      }

      const formatPrice = priceFreightProducts.map(price => {
         return {
            type: price.type,
            typeId: price.typeId,
            price: parseFloat(price.price.toFixed(2)),
            deadline: price.deadline
         }
      });
      
      return formatPrice;
   }
}

module.exports = { CalculateFreightService }