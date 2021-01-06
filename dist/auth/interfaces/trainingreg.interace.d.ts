import { Document } from "mongoose";
export interface trainingReg extends Document {
    readonly Lastname: String;
    readonly Firstname: String;
    readonly Datedenaissance: String;
    readonly numTel: String;
    readonly email: String;
    readonly diplome: Boolean;
    readonly online: Boolean;
    readonly typePresence: Boolean;
    readonly programme: string;
}
