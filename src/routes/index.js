const { Router } = require("express");
const { userRoutes } = require("./user.routes");
const { addressRoutes } = require("./address.routes");

const router = Router();

router.use("/users", userRoutes);
router.use("/address", addressRoutes);

module.exports = { router }