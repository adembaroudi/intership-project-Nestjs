import * as mongoose from "mongoose";
export const partenairesSchema = new mongoose.Schema({
  id: String,
  nomPartenaire: String,
  Logo: String,
});
