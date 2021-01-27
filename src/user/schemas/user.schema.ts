import {Types , Schema} from 'mongoose'
export const usersSchema = new Schema({
    id : String,
    Firstname: String,
    Lastname: String,
    Datedenaissance: String,
    numTel: String,
    email: String,
    password: String,
    img : String,
    role: {type: String, enum: ["Coach", "Developpeur","Program manager","social relationship","CEO","co-founder","designeur" ]},
    trainings:[{type: Types.ObjectId, ref: 'trainings'}]
})
               