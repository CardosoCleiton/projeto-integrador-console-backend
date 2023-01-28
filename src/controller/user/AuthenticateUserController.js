const { AuthenticateUserService } = require("../../services/user/AuthenticateUserService");

class AuthenticateUserController{
   async handle(request, response){
      const { email, password } = request.body;

      console.log(email, password);
      
      const authenticateUserService = new AuthenticateUserService();
      const tokenUser = await authenticateUserService.execute(email, password);

      return response.status(200).json(tokenUser);

   }
}

module.exports = { AuthenticateUserController }