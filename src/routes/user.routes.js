import { Router } from "express";
import { CreateUserController } from "../controller/user/CreateUserController.js";
import { GetUserByIdController } from "../controller/user/GetUserByIdController.js";

const userRoutes = Router();

const createUserController = new CreateUserController();
const getUserByIdController = new GetUserByIdController();

userRoutes.post("/", createUserController.handle);
userRoutes.get("/:id", getUserByIdController.handle);

export { userRoutes };