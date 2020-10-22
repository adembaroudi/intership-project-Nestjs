import { Document } from "mongoose";

export interface Contacts extends Document {
  readonly id: String;
  readonly name: String;
  readonly subject: String;
  readonly email: String;
  readonly contenuMessage: String;
  readonly emailPassword : String;
}
