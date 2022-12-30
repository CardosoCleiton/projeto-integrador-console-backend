const { CreateAddressController } = require("../controller/address/CreateAddressController");
const { ListAllAddressController } = require("../controller/address/ListAllAddressController");
const { FindAddressByIdController } = require("../controller/address/FindAddressByIdController");
const { UpdateAddressController } = require("../controller/address/UpdateAddressController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const { Router } = require("express");

const addressRoutes = Router();

const createAddressController = new CreateAddressController();
const listAllAddressController = new ListAllAddressController();
const findAddressByIdController = new FindAddressByIdController();
const updateAddressController = new UpdateAddressController();

addressRoutes.get("/", isAuthenticated, listAllAddressController.handle);
addressRoutes.post("/", isAuthenticated, createAddressController.handle);
addressRoutes.get("/:id", isAuthenticated, findAddressByIdController.handle);
addressRoutes.put("/:id/update", isAuthenticated, updateAddressController.handle);

module.exports = { addressRoutes }