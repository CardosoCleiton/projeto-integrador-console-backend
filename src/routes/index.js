const { Router } = require("express");
const { userRoutes } = require("./user.routes");
const { addressRoutes } = require("./address.routes");
const { employeeRoutes } = require("./employee.routes");
const { categoryRoutes } = require("./category.routes");
const { productRoutes } = require("./product.routes");
const { packagingRoutes } = require("./packaging.routes");
const { orderRoutes } = require("./order.routes");
const { freightRoutes } = require("./freight.routes");

const router = Router();

router.get("/", (request, response) => {
   return response.json({
      message: "Hello Word"
   });
});

router.use("/users", userRoutes);
router.use("/address", addressRoutes);
router.use("/employees", employeeRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/packagings", packagingRoutes);
router.use("/order", orderRoutes);
router.use("/freight", freightRoutes);

module.exports = { router }