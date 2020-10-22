import { Types, Schema } from "mongoose";

export const trainingRegSchema = new Schema({
  firstname: String,
  lastname: String,
  numTel: String,
  email: String,
  diplome: Boolean,
  online: Boolean,
  resterInforme: Boolean,
  training: { type: Types.ObjectId, ref: "training" },
});
