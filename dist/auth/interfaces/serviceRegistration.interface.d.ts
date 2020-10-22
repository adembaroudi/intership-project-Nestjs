import { Document } from "mongoose";
export interface traserviceRegistration extends Document {
    readonly firstname: String;
    readonly lastname: String;
    readonly email: String;
    readonly numTel: String;
    readonly cv: String;
    readonly sujet: String;
    readonly service: String;
}
