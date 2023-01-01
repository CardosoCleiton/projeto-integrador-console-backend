const { CreateEmployeeService } = require("../../services/employee/CreateEmployeeService");

class CreateEmployeeController{
   async handle(request, response){
      const {contractDate, userId} = request.body;
      const createEmployeeService = new CreateEmployeeService();
      const employee = await createEmployeeService.execute(contractDate, userId);
      return response.status(201).json(employee);
   }
}

module.exports = { CreateEmployeeController }