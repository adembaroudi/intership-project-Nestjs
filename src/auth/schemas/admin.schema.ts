
import * as mongoose from 'mongoose'
export const adminSchema = new mongoose.Schema ({
    name: String,
    email:  String,
    password: String,
    role: {type: String, default:'admin'}
});  