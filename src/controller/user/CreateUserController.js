import { CreateUserService } from "../../services/user/CreateUserService.js";

export class CreateUserController{
   handle(request, response){
      const { nome, email, password, data_nascimento } = request.body;
      
      const createUserService = new CreateUserService();

      const user = createUserService.execute(nome, email, password, data_nascimento);

      return response.json(user);
   }
}