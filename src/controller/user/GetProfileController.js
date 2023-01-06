const {GetProfileService} = require("../../services/user/GetProfileService");

class GetProfileController{
   async handle(request, response){
        const {id} = request.user;
        console.log("Controler"+id);
        const getProfileService = new GetProfileService();
        const user = await getProfileService.execute(id);
        return response.json(user);
    }
}

module.exports = {GetProfileController}