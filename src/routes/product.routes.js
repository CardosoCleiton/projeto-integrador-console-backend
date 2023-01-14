const multer = require("multer");
const uploadConfig = require("../config/multer");
const { Router } = require("express");
const { isAdmin } = require("../middlewares/isAdmin");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { CreateProductController } = require("../controller/product/CreateProductController");
const { UpdateProductController } = require("../controller/product/UpdateProductController");
const { FindProductByIdController } = require("../controller/product/FindProductByIdController");
const { ListAllProductController } = require("../controller/product/ListAllProductController");
const { CalculateProductFreightController } = require("../controller/product/CalculateProductFreightController");
const { ListProductsByCategoryController } = require("../controller/product/ListProductsByCategoryController");

const upload = multer(uploadConfig.upload("products"));

const productRoutes = Router();

//Produto
const createProductController = new CreateProductController();
const updateProductController = new UpdateProductController();
const findProductByIdController = new FindProductByIdController();
const listAllProductsController = new ListAllProductController();
const calculateProductFreightController = new CalculateProductFreightController();
const listProductsByCategoryController = new ListProductsByCategoryController();

productRoutes.get("/", listAllProductsController.handle);
productRoutes.get("/category/:slug", listProductsByCategoryController.handle);
productRoutes.post("/", isAuthenticated, isAdmin, upload.array('file'), createProductController.handle);
productRoutes.put("/:id", isAuthenticated, isAdmin, updateProductController.handle);
productRoutes.get("/:id", findProductByIdController.handle);
productRoutes.post("/:id/freight", calculateProductFreightController.handle);

module.exports = { productRoutes }