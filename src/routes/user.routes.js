const { Router } = require("express");
const { CreateUserController } = require("../controller/user/CreateUserController");
const { AuthenticateUserController } = require("../controller/user/AuthenticateUserController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const userRoutes = Router();


const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

userRoutes.post("/", createUserController.handle);
userRoutes.post("/authenticate", authenticateUserController.handle);

module.exports = { userRoutes };