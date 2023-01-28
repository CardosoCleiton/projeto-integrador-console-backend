const multer = require("multer");
const uploadConfig = require("../config/multer");
const { CreateCategoryController } = require("../controller/category/CreateCategoryController");
const { ListAllCategoryController } = require("../controller/category/ListAllCategoryController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { isAdmin } = require("../middlewares/isAdmin");

const { Router } = require("express");


const categoryRoutes = Router();
const upload = multer(uploadConfig.upload("icons"));

const createCategoryController = new CreateCategoryController();
const listAllCategoryController = new ListAllCategoryController();

categoryRoutes.get("/", listAllCategoryController.handle);
categoryRoutes.post("/", isAuthenticated, isAdmin, upload.single('file'), createCategoryController.handle);

module.exports = { categoryRoutes }