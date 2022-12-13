const { User } = require("../../database/models/User");
const { v4: uuidV4 } = require("uuid");
const { AppError } = require("../../error/AppError");
const { hash } = require("bcrypt");
const { Op } = require("sequelize");

class CreateUserService{

   async execute(name, email, password, cpf, birth_date){

      const validateEmailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

      if(!validateEmailRegex.test(email)){
         throw new AppError("O E-mail informado não é valido");
      }

      const validatePasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;

      if(!validatePasswordRegex.test(password)){
         throw new AppError("A senha deve conter no mínimo 8 caracteres, sendo eles: um digito, uma letra maiúscula, uma letra minúscula, um caractere especial.");
      }

      const userExists = await User.findOne({
         where: {
            [Op.or]: [{ email: email }, { cpf: cpf }]
         },
      });

      if(userExists){
         throw new AppError("Já existe um usuário cadastrado com esse e-mail ou CPF");
      }

      const passwordHash = await hash(password, 8);
      const id = uuidV4();
      
      const user = await User.create({
         id: id,
         name: name,
         email: email,
         password: passwordHash,
         birth_date: birth_date,
         cpf: cpf,
      });

      const responseUser = {
         id: user.id,
         name: user.name,
         email: user.email,
         birth_date: user.birth_date,
         cpf: user.cpf,
         createdAt: user.createdAt,
         updatedAt: user.updatedAt
      }
   
      return responseUser;

   }

}

module.exports = { CreateUserService }