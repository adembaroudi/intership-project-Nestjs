import * as mongoose from "mongoose";

export const serviceRegistrationSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  numTel: String,
  cv: String,
  sujet: String,
  service: { type: String, enum: ["Consulting", "Coaching", " Web_Developpement"] },
});
