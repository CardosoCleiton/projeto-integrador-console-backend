const { Router } = require("express");
const { isAdmin } = require("../middlewares/isAdmin");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { CreateProductController } = require("../controller/product/CreateProductController");
const { UpdateProductController } = require("../controller/product/UpdateProductController");
const { FindProductByIdController } = require("../controller/product/FindProductByIdController");
const { ListAllProductController } = require("../controller/product/ListAllProductController");

const productRoutes = Router();

//Produto
const createProductController = new CreateProductController();
const updateProductController = new UpdateProductController();
const findProductByIdController = new FindProductByIdController();
const listAllProductsController = new ListAllProductController();

productRoutes.get("/", listAllProductsController.handle);
productRoutes.post("/", isAuthenticated, isAdmin, createProductController.handle);
productRoutes.put("/:id", isAuthenticated, isAdmin, updateProductController.handle);
productRoutes.get("/:id", findProductByIdController.handle);

module.exports = { productRoutes }