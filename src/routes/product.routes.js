const { Router } = require("express");
const { CreatePackagingController } = require("../controller/product/CreatePackagingController");
const { CreateProductController } = require("../controller/product/CreateProductController");
const { UpdateProductController } = require("../controller/product/UpdateProductController");
const { isAdmin } = require("../middlewares/isAdmin");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const productRoutes = Router();


//Produto
const createProductController = new CreateProductController();
const updateProductController = new UpdateProductController();

//Packaging
const createPackagingController = new CreatePackagingController();

productRoutes.post("/", isAuthenticated, isAdmin, createProductController.handle);
productRoutes.post("/packagings", isAuthenticated, isAdmin, createPackagingController.handle);
productRoutes.put("/:id", isAuthenticated, isAdmin, updateProductController.handle);

module.exports = { productRoutes }