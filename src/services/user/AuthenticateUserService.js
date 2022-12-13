const { User } = require("../../database/models/User");
const { AppError } = require("../../error/AppError");
const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");

class AuthenticateUserService{
   async execute(email, password){
      
      if(!email || !password){
         throw new AppError("Email e senha são obrigatórios!");
      }

      const user = await User.findOne({
         where: {
            email
         }
      });

      
      if(!user){
         throw new AppError("Email ou senha incorreta!", 401);
      }
      
      const match = await compare(password, user.password);
  
      if(!match){
         throw new AppError("Email ou senha incorreta!", 401);
      }

      const token = sign({}, process.env.JWT_SECRET_TOKEN, {
         subject: user.id,
         expiresIn: "1d"
      });

      return {
         token,
         user: {
            name: user.name,
            email: user.email
         }
      };

   }
}

module.exports = { AuthenticateUserService }