const { Product } = require("../../database/models/Product");
const { Category } = require("../../database/models/Category");
const { AppError } = require("../../error/AppError");
const { ImageProduct } = require("../../database/models/ImageProduct");
const { Op } = require("sequelize");

class ListProductsByCategoryService{
   async execute({slug, page, limit}){

      const category = await Category.findOne({
         where: {
            slug: slug
         }
      });
      
      if(!category){
         throw new AppError("Categoria não encontrada.", 404);
      }

      let offset = 0;

      if(!limit || isNaN(limit)){
         limit = 8;
      }

      limit = parseInt(limit);

      if(isNaN(page) || page == 1 || !page || page == 0){
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
         }],
         where: {
            stock: {
               [Op.gt]: 0
            },
            categoryId: category.id
         },
         order: [
            ['createdAt', 'desc'],
            ['updatedAt', 'desc']
         ]
      });

      const total = await Product.count({
         where: {
            stock: {
               [Op.gt]: 0
            }
         }
      });
      
      let next = true;
      if(offset + limit >= total){
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
               "image_products": product["image_products"].map(image => {
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

module.exports = { ListProductsByCategoryService }