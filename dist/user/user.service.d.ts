import { Model } from "mongoose";
import { User } from "../user/user.model";
import { UserDto } from "../user/dto/user.dto";
export declare class userService {
    private readonly userModel;
    private user;
    constructor(userModel: Model<User>);
    addUser(userDto: UserDto): Promise<any>;
    getAllUsers(): Promise<User>;
    getUserById(id: String): Promise<any>;
    deleteUser(id: String): Promise<User>;
    logoUserPic(file: any, id: any): Promise<any>;
    getLogo(id: any): Promise<User>;
}
