import { Model } from "mongoose";
import { User } from "../user/user.model";
import { UserDto } from "../user/dto/user.dto";
export declare class userService {
    private readonly userModel;
    private user;
    constructor(userModel: Model<User>);
    addUser(userDto: UserDto): Promise<User>;
    getAllUsers(): Promise<User>;
    getUserById(id: String): Promise<User>;
    deleteUser(id: String): Promise<User>;
}
