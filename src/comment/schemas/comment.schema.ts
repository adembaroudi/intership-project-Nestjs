// import * as mongoose from "mongoose";
import {Types , Schema} from 'mongoose'
export const commentsSchema = new Schema({
  id: String,
  name:String,
  date:String,
  contenue:String,
  email:String,
  blog : { type: Types.ObjectId, ref: 'Blog'},
  replyComment: [{type: Types.ObjectId, ref: 'replyComment'}]
});
