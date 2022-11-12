import { v4 as uuidV4 } from "uuid";

export class User{
   constructor(nome, email, password, data_nascimento, id){
      this.nome = nome;
      this.email = email;
      this.password = password;
      this.data_nascimento = data_nascimento;
      if(!id){
         this.id = uuidV4();
      }else{
         this.id = id;
      }
   }
}