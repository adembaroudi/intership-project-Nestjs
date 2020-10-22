import { Document } from "mongoose";
export interface Comments extends Document {
    readonly id: String;
    readonly name: String;
    readonly date: String;
    readonly contenue: String;
    readonly email: String;
}
