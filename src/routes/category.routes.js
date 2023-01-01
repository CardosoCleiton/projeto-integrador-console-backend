const { CreateCategoryController } = require("../controller/category/CreateCategoryController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { isAdmin } = require("../middlewares/isAdmin");

const { Router } = require("express");

const categoryRoutes = Router();

const createCategoryController = new CreateCategoryController();

categoryRoutes.post("/", isAuthenticated, isAdmin, createCategoryController.handle);

module.exports = { categoryRoutes }