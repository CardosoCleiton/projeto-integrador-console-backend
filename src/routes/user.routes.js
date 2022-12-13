const { Router } = require("express");
const { CreateUserController } = require("../controller/user/CreateUserController");
const { AuthenticateUserController } = require("../controller/user/AuthenticateUserController");
const { CreateAddressController } = require("../controller/user/CreateAddressController");
const { ListAllAddressController } = require("../controller/user/ListAllAddressController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const userRoutes = Router();


const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

const createAddressController = new CreateAddressController();
const listAllAddressController = new ListAllAddressController();

userRoutes.post("/", createUserController.handle);
userRoutes.post("/authenticate", authenticateUserController.handle);

//Address
userRoutes.get("/address", isAuthenticated, listAllAddressController.handle);
userRoutes.post("/address", isAuthenticated, createAddressController.handle);

module.exports = { userRoutes };