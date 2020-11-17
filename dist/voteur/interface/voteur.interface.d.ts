import { Document } from "mongoose";
export interface Voteur extends Document {
    readonly Id: String;
    readonly Firstname: String;
    readonly Lastname: String;
    readonly email: String;
    readonly password: String;
}
