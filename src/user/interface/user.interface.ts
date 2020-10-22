import { Document } from 'mongoose';

export interface Users extends Document {
    readonly id : String ; 
    readonly Lastname: String;
    readonly Firstname: String;
    readonly Datedenaissance: String;
    readonly numTel: String;
    readonly email: String;
    readonly password: String
    readonly img : String;
    readonly role: String;
}
