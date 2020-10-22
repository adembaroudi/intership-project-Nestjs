// import * as mongoose from "mongoose";
import {Types , Schema} from 'mongoose'
export const blogsSchema = new Schema({
  id: String,
  Title: String,
  date: String,
  auteur: String,
  image: String,
  Contenue: String,
  comment: [{type: Types.ObjectId, ref: 'Comment'}],
 


});
