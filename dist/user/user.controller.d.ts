import { UserDto } from "../user/dto/user.dto";
import { userService } from "../user/user.service";
export declare class UserController {
    private userService;
    constructor(userService: userService);
    addUser(res: any, userDto: UserDto): Promise<any>;
    getUserById(id: string, res: any): Promise<any>;
    deleteUser(id: String, res: any): Promise<any>;
}
