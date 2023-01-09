const mercadopago = require("mercadopago");
const { mercadoPagoConfig } = require("../config/config");
const { AppError } = require("../error/AppError");

mercadopago.configurations.setAccessToken(mercadoPagoConfig.accessToken);

class MercadoPago{
   async pay(amount, paymentData){
      paymentData.transaction_amount = amount;
      try{
         const { body } = await mercadopago.payment.save(paymentData);
         const formatPaymentResponse = {
            id: body.id,
            status: body.status,
            status_detail: body.status_detail,
            date_approved: body.date_approved,
            payment_method_id: body.payment_method_id,
            payment_type_id: body.payment_type_id
         }
         return formatPaymentResponse;
      }catch(error){
         console.error(error);
         throw new AppError("Erro ao processar pagamento");
      }
   }
}

module.exports = { MercadoPago }