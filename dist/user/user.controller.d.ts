import { UserDto } from "../user/dto/user.dto";
import { userService } from "../user/user.service";
export declare class UserController {
    private userService;
    constructor(userService: userService);
    addUser(res: any, userDto: UserDto): Promise<any>;
    getAllUsers(): Promise<import("./user.model").User>;
    getUserById(id: string, res: any): Promise<any>;
    updatepartenaire(id: String, res: any, userDto: UserDto): Promise<any>;
    deleteUser(id: String, res: any): Promise<any>;
    uploadLogoCompany(res: any, file: any, id: any): Promise<any>;
    getFiles(id: String, res: any): Promise<any>;
}
