// import * as mongoose from "mongoose";
import {Types , Schema} from 'mongoose'
export const replaycommentsSchema = new Schema({
  id: String,
  name:String,
  date:String,
  contenue:String,
  email:String,
  comment : { type: Types.ObjectId, ref: 'Comment'},
 
});
