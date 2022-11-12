import { User } from "../../model/User.js";

export const users = [];

export class CreateUserService{
   execute(nome, email, password, data_nascimento){
      const user = new User(nome, email, password, data_nascimento);
      users.push(user);
      
      const response = { 
         id: user.id,
         nome: user.nome,
         email: user.email
      }

      return response;
   }
}