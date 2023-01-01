const { Employee } = require("../database/models/Employee");
const { AppError } = require("../error/AppError");

async function isAdmin(request, response, next){
   const { id: userId } = request.user;

   const employeeExists = await Employee.findOne({
      where: {
         userId
      }
   });

   if(!employeeExists){
      throw new AppError("Usuário não autorizado a acessar o recurso!");
   }else{
      request.employee = {
         id: employeeExists.id
      }
      return next();
   }

}

module.exports = { isAdmin }