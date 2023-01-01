const { Router } = require("express");
const { userRoutes } = require("./user.routes");
const { addressRoutes } = require("./address.routes");
const { employeeRoutes } = require("./employee.routes");
const { categoryRoutes } = require("./category.routes");
const { productRoutes } = require("./product.routes");

const router = Router();

router.use("/users", userRoutes);
router.use("/address", addressRoutes);
router.use("/employees", employeeRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);

module.exports = { router }