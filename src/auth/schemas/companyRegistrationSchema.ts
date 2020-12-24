import * as mongoose from "mongoose";
export const companyRegistrationSchema = new mongoose.Schema({
  companyName: String,
  email: String,
  numTel: String,
  sujet: String,
  service: { type: String, enum: ["Consulting", "Coach", "Developpeur"] },
});