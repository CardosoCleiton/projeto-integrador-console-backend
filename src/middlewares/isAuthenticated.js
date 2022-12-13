const { verify } = require("jsonwebtoken");
const { User } = require("../database/models/User");
const { AppError } = require("../error/AppError");

async function isAuthenticated(request, response, next){

   const authHeader = request.headers.authorization;
   console.log(authHeader);
   if(!authHeader){
      throw new AppError("Token obrigatório");
   }

   const [, token] = authHeader.split(" ");

   try{
      const { sub: user_id } = verify(token, process.env.JWT_SECRET_TOKEN);

      const user = await User.findByPk(user_id);

      if(!user){
         throw new AppError("Usuário não existe!", 401);
      }

      request.user = {
         id: user_id
      }

      return next();
   }catch(error){
      throw new AppError("Token inválido", 401);
   }

}

module.exports = { isAuthenticated }