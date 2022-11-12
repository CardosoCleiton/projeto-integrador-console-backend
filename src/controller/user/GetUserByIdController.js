import { GetUserByIdService } from "../../services/user/GetUserByIdService.js";

export class GetUserByIdController {
    handle(request, response) {
        const {id}= request.params; 
        const getUserByIdService = new GetUserByIdService();
        const user = getUserByIdService.execute(id);
        return response.json(user);
    }
}