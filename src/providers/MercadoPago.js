const mercadopago = require("mercadopago");
const { mercadoPagoConfig } = require("../config/config");
const { AppError } = require("../error/AppError");
const axios = require("axios");

mercadopago.configurations.setAccessToken(mercadoPagoConfig.accessToken);

class MercadoPago{
   async pay(amount, paymentData){
      paymentData.transaction_amount = amount;
      console.log(paymentData);
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

   async payApi(amount, paymentData){
      paymentData.transaction_amount = amount;
      try{
         const { data } = await axios({
            url: "https://api.mercadopago.com/v1/payments",
            method: "post",
            headers: {
               'Authorization': `Bearer ${mercadoPagoConfig.accessToken}`,
               'Content-Type': 'application/json'
            },
            data: {
               payer: {
                  email: paymentData.payer.email
               },
               token: paymentData.token,
               transaction_amount: paymentData.transaction_amount,
               installments: paymentData.installments,
               payment_method_id: paymentData.payment_method_id
            }
         });
         console.log(data);
         return data;
      }catch(error){
         console.log(error.header);
         throw new AppError("Erro ao processar pagamento");
      }
   }
}

module.exports = { MercadoPago }