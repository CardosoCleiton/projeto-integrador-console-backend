const { Product } = require("../../database/models/Product");
const { Packaging } = require("../../database/models/Packaging");
const { AppError } = require("../../error/AppError");
const { MercadoPago } = require("../../providers/MercadoPago");
const { Order } = require("../../database/models/Order");
const { OrderItem } = require("../../database/models/OrderItem");
const { HistoryStatusOrder } = require("../../database/models/HistoryStatusOrder");
const { Freight } = require("../../providers/Freight");
const { Address } = require("../../database/models/Address");
const { sequelize } = require("../../database/sequelize");
const { v4: uuidV4 } = require("uuid");
const { freightConfig } = require("../../config/config");
const { Op } = require("sequelize");

class CreateOrderService{
   async execute(paymentData, orderItems, freight, userId){
      const transaction = await sequelize.transaction();
      //Pegando todos os items
      const products = [];
      for(let item of orderItems){
        try{
          const findItem = await Product.findOne({
            where: {
              id: item.productId,
              stock: {
                [Op.gt]: 0
             }
            },
            include: Packaging
          });

          await findItem.decrement("stock", {by: item.quantity}, { transaction: transaction });

          findItem.quantity = item.quantity;
          products.push(findItem);
        }catch(error){
          console.log(error);
          throw new AppError(`Erro ao localizar produto. Certifique-se se o produto está disponível para compra.`);
        }
      }

      let address;
      try{
        address = await Address.findOne({
          where: {
            id: freight.addressId,
            userId: userId
          },
          attributes: ["cep", "street"]
        });
      }catch(error){
        throw new AppError("Erro ao localizar enderenço.");
      }

      if(!address){
        throw new AppError("Endereço não encontrado.");
      }

      //Calculando frete
      for(let i = 0; i < products.length; i++){
        const freightService = new Freight();
        try{
          const freightPrice = await freightService.calculateDeadline({
            sCepOrigem: freightConfig.cepOrigin,
            nCdServico: freight.freightType,
            sCepDestino: address.cep,
            nVlPeso: parseFloat(products[i].weight) + parseFloat(products[i].packaging.weight),
            nCdFormato: products[i].packaging.format,
            nVlComprimento: products[i].packaging.length,
            nVlAltura: products[i].packaging.height,
            nVlLargura: products[i].packaging.width,
            nVlDiametro: products[i].packaging.diameter
          })
          products[i].freight = parseFloat(freightPrice[0].Valor.replace(",", "."));
        }catch(error){
          transaction.rollback();
          throw new AppError("Erro inesperado ao calcular frete. Tente novamente mais tarde.");
        }
      }
      
      //calculando valor total dos produtos.
      const totalPriceProduct = products.reduce((accumulator, currentValue) => {
        return accumulator + ((currentValue.price + currentValue.freight) * currentValue.quantity)
      }, 0);
      
      try{
        //Realizando pedido mercado pago.
        const mercadoPago = new MercadoPago();
        // const paymentApiResponse = await mercadoPago.payApi(totalPriceProduct, paymentData);
        const paymentResponse = await mercadoPago.pay(parseFloat(totalPriceProduct.toFixed(2)), paymentData);
        
        if(!paymentResponse.date_approved){
          transaction.rollback();
          throw new AppError(`Pagamento não autorizado. Motivo: ${paymentResponse.status_detail}`);
        }

        //Criando Pedido
        const order = await Order.create({
          date_request: new Date(),
          payment_id: paymentResponse.id,
          payment_status: paymentResponse.status,
          payment_status_detail: paymentResponse.status_detail,
          payment_date_approved: paymentResponse.date_approved,
          payment_method_id: paymentResponse.payment_method_id,
          payment_type_id: paymentResponse.payment_type_id,
          addressId: freight.addressId,
          userId: userId
        }, { transaction: transaction });

        //Criando history
        const orderHistory = await HistoryStatusOrder.create({
          id: uuidV4(),
          status: "Pagamento Aprovado",
          description: "Seu pagamento foi aprovado, agora nossa equipe está preparando seu pedido.",
          date_status: new Date(),
          orderId: order.id
        },{ transaction: transaction });

        //Criando item do pedido:
        for(let product of products){
          await OrderItem.create({
            id: uuidV4(),
            quantity: product.quantity,
            total_price_items: product.quantity * product.price,
            total_price_freight: product.quantity * product.freight,
            unit_purchase_price: product.price,
            unit_price_freight: product.freight,
            productId: product.id,
            orderId: order.id
          }, { transaction: transaction });
        }

        await transaction.commit();

        const orderResponse = Order.findOne({
          where: {
            id: order.id
          },
          include: [
            {
              model: OrderItem,
              attributes: ["productId", "quantity", "total_price_items", "total_price_freight"],
              include: [
                {
                  model: Product,
                  attributes: ["name"],
                } 
              ]
            },
            {
              model: HistoryStatusOrder,
              attributes: ["id", "status", "description", "date_status"]
            },
            {
              model: Address,
              attributes: ["id", "cep", "street", "district", "city", "state", "number", "complement"]
            }
          ]
        });

        return orderResponse;
      }catch(error){
        transaction.rollback();
        throw new AppError("Erro ao processar pagamento.");
      }
   }
}

module.exports = { CreateOrderService }