const { AppError } = require("../error/AppError");
const Correios = require("node-correios");
const correios = new Correios();

class Freight{
   async calculateDeadline({sCepOrigem, nCdServico, sCepDestino, nVlPeso, nCdFormato, nVlComprimento, nVlAltura, nVlLargura, nVlDiametro}){
      const args = {
         nCdServico: nCdServico,
         sCepOrigem: sCepOrigem,
         sCepDestino: sCepDestino,
         nVlPeso: nVlPeso,
         nCdFormato: nCdFormato,
         nVlComprimento: nVlComprimento,
         nVlAltura: nVlAltura,
         nVlLargura: nVlLargura,
         nVlDiametro: nVlDiametro
      }
      try{
         const deadline = await correios.calcPrecoPrazo(args);
         return deadline;
      }catch(error){
         console.log(error);
         throw new AppError("Erro ao calcular frete.");
      }
   }
}

module.exports = { Freight }