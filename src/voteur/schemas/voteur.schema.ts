import {Types , Schema} from 'mongoose'
export const voteurSchema = new Schema({
    id : String,
    email: String,
    choice: {type : String , default : "like"},
    trainings:[{type: Types.ObjectId, ref: 'trainings'}],
})