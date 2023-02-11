const { Router } = require("express");
const { CreateOrderController } = require("../controller/order/CreateOrderController");
const { ListAllOrderController } = require("../controller/order/ListAllOrderController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const orderRoutes = Router();

const createOrderController = new CreateOrderController();
const listAllOrderController = new ListAllOrderController();

orderRoutes.get("/", isAuthenticated, listAllOrderController.handle);
orderRoutes.post("/", isAuthenticated, createOrderController.handle);

module.exports = { orderRoutes }