const { v4: uuidV4 } = require("uuid");
const { Employee } = require("../../database/models/Employee");

class CreateEmployeeService{
   async execute(contractDate, userId){
      const id = uuidV4();

      const createEmployee = await Employee.create({
         id,
         contract_date: contractDate,
         userId
      });

      return createEmployee;

   }
}

module.exports = { CreateEmployeeService }