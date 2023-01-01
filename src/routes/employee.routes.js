const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { CreateEmployeeController } = require("../controller/employee/CreateEmployeeController");

const { Router } = require("express");

const employeeRoutes = Router();

const createEmployeeController = new CreateEmployeeController();

employeeRoutes.post("/", isAuthenticated, createEmployeeController.handle)

module.exports = { employeeRoutes }