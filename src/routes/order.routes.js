const { Router } = require("express");
const { CreateOrderController } = require("../controller/order/CreateOrderController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const orderRoutes = Router();

const createOrderController = new CreateOrderController();

orderRoutes.post("/", isAuthenticated, createOrderController.handle);

module.exports = { orderRoutes }