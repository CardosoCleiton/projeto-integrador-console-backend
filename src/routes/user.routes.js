const { Router } = require("express");
const { CreateUserController } = require("../controller/user/CreateUserController");
const { GetProfileController } = require("../controller/user/GetProfileController");
const { AuthenticateUserController } = require("../controller/user/AuthenticateUserController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const userRoutes = Router();


const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const getProfileController = new GetProfileController();

userRoutes.post("/", createUserController.handle);
userRoutes.post("/authenticate", authenticateUserController.handle);
userRoutes.get("/", isAuthenticated, getProfileController.handle);

module.exports = { userRoutes };