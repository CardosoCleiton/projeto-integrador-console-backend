import {users} from "./CreateUserService.js"

export class GetUserByIdService {
    execute(id) {
        return users.find(user => user.id === id);   
    }
}