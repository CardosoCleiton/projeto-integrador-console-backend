const { User } = require("../../database/models/User");

class GetProfileService {
   async execute(id){
        console.log("chegou"+id);
        const user = await User.findByPk(id);
        return user;
    }
}

module.exports = {GetProfileService}