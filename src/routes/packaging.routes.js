const { Router } = require("express");
const { CreatePackagingController } = require("../controller/packaging/CreatePackagingController");
const { isAdmin } = require("../middlewares/isAdmin");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const packagingRoutes = Router();

//Packaging
const createPackagingController = new CreatePackagingController();

packagingRoutes.post("/", isAuthenticated, isAdmin, createPackagingController.handle);

module.exports = { packagingRoutes }