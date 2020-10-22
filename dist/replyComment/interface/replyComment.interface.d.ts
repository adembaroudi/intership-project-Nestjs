import { Document } from "mongoose";
export interface replayComments extends Document {
    readonly id: String;
    readonly name: String;
    readonly date: String;
    readonly contenue: String;
    readonly email: String;
}
