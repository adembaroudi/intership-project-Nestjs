import { Schema } from "mongoose";
export const contactsSchema = new Schema({
  id: String,
  name: String,
  subject: String,
  email: String,
  contenuMessage: String,
  emailPassword : String
});
