const { CreateUserService } = require("../../services/user/CreateUserService.js");

class CreateUserController{
   async handle(request, response){
      const { name, email, password, cpf, birth_date, address_id  } = request.body;
      
      const createUserService = new CreateUserService();

      const user = await createUserService.execute(name, email, password, cpf, birth_date, address_id);

      return response.status(201).json(user);
   }
}

module.exports = { CreateUserController }