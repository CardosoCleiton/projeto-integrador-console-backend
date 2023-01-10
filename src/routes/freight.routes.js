const { Router } = require("express");
const { CalculateFreightController} = require("../controller/freight/CalculateFreightController")
const freightRoutes = Router();
const calculateFreightController = new CalculateFreightController();

freightRoutes.post("/", calculateFreightController.handle);

module.exports = { freightRoutes}
