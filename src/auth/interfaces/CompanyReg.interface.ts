import { Document } from "mongoose";

export interface companyRegistration extends Document {
  readonly companyName: String;
  readonly email: String;
  readonly numTel: String
  readonly sujet: String;
  readonly service: String;
}