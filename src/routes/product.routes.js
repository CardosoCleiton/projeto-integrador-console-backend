const { Router } = require("express");
const { CreatePackagingController } = require("../controller/product/CreatePackagingController");
const { CreateProductController } = require("../controller/product/CreateProductController");
const { isAdmin } = require("../middlewares/isAdmin");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const productRoutes = Router();


//Produto
const createProductController = new CreateProductController();

//Packaging
const createPackagingController = new CreatePackagingController();

productRoutes.post("/", isAuthenticated, isAdmin, createProductController.handle);
productRoutes.post("/packagings", isAuthenticated, isAdmin, createPackagingController.handle);

module.exports = { productRoutes }