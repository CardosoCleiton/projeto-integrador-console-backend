# API do Projeto e-commerce Console.
**Projeto Integrador - Digital House DH**

### Observações: 
##### Modelo de corpo da requisição POST para criar um novo pedido:
<code>
{
   "paymentData": {
      "token": "19b6f4f3fd9608d03ea96dafdae77968",
      "issuer_id": "24",
      "payment_method_id": "master",
      "transaction_amount": 100.5,
      "installments": 1,
      "description": "Descrição do produto",
      "payer": {
         "email": "hyago.alves@outlook.com",
         "identification": { "type": "CPF", "number": "02995399036" }
      }
   },
   "orderItems": [
      {
         "productId": "23sds45684sad",
         "quantity": 2
      },
      {
         "productId": "23432454654",
         "quantity": 1
      }
   ],
   "freight": {
      "addressId": "1235465",
      "freightType": "12356
   }
}
</code>