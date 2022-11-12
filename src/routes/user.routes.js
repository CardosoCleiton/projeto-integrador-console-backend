import { Router } from "express";
import { CreateUserController } from "../controller/user/CreateUserController.js";

const userRoutes = Router();


const createUserController = new CreateUserController();

userRoutes.post("/", createUserController.handle);

export { userRoutes };