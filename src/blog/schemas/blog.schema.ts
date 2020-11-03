// import * as mongoose from "mongoose";
import {Types , Schema} from 'mongoose'
export const blogsSchema = new Schema({
  id: String,
  Title: String,
  date: {type: Date , default : Date.now()},
  auteur: String,
  image: String,
  Contenue: String,
  comment: [{type: Types.ObjectId, ref: 'comment'}],
 


});


