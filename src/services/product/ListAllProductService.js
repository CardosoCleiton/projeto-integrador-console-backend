const { Product } = require("../../database/models/Product");
const { ImageProduct } = require("../../database/models/ImageProduct");

class ListAllProductService{
   async execute({page, limit}){
      let offset = 0;

      if(!limit || isNaN(limit)){
         limit = 8;
      }

      limit = parseInt(limit);

      if(isNaN(page) || page == 1 || !page){
         offset = 0;
      }else{
         offset = (parseInt(page) - 1) * limit;
      }

      const products = await Product.findAndCountAll({
         limit: limit,
         offset: offset,
         attributes: ["id", "name", "description", "price", "createdAt", "updatedAt", "packagingId", "categoryId"],
         include: [{
            model: ImageProduct,
            attributes: ["id", "name"]
         }]
      });
      
      let next = true;
      if(offset + limit >= products.count){
         next = false;
      }

      const result = {
         next: next,
         rows: products.rows.map(product => {
            return {
               id: product.id,
               name: product.name,
               description: product.description,
               price: product.price,
               weight: product.weight,
               createdAt: product.createdAt,
               updatedAt: product.updatedAt,
               categoryId: product.categoryId,
               "image-products": product["image-products"].map(image => {
                  return {
                     id: image.id,
                     name: image.name
                  }
               })
            }
         })
      }

      return result;

   }
}

module.exports = { ListAllProductService }