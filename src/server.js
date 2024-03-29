require("dotenv/config");
const express = require("express");
require("express-async-errors");
const { router } = require("./routes");
const { AppError } = require("./error/AppError");
const { sequelize } = require("./database/sequelize");
const { resolve } = require("path");
const cors = require("cors");
const { appConfig } = require("./config/config");
require("./database/associations");


const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

app.use("/images/products", express.static(resolve(__dirname, "..", "tmp", "products")));
app.use("/images/icons", express.static(resolve(__dirname, "..", "tmp", "icons")));

app.use((error, request, response, next) => {
   if(error instanceof AppError){
      return response.status(error.status).json({
         message: error.message
      });
   }

   return response.status(500).json({
      message: "Erro interno do servidor."
   });

});

app.listen(appConfig.port, async () => {
   await sequelize.sync();
   console.log(`Servidor iniciado na porta ${appConfig.port}!`);
});