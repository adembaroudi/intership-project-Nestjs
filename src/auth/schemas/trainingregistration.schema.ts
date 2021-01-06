import { Types, Schema } from "mongoose";

export const trainingRegSchema = new Schema({
  firstname: String,
  lastname: String,
  numTel: String,
  email: String,
  diplome: String,
  online: String,
  typePresence: {type : String , enum:["quotidien" , "week-end"]},
  programme: {
    type: String,
    enum: [
      "FullStack Web(Dans la peau d’un développeur Web)",
      "Angular/ReactJS",
      "NodeJs/JavaJee/Spring", 
      "FullStack Web(Dans la peau d’un ingenieur DevOps)",
      "Business Intelligence",
      "DATA SCIENCE/DEEP LEARNING",
    ],
  },
  training: { type: Types.ObjectId, ref: "training" }, 
});
 