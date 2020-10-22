"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersSchema = void 0;
const mongoose = require("mongoose");
exports.usersSchema = new mongoose.Schema({
    Firstname: String,
    Lastname: String,
    Datedenaissance: String,
    numTel: String,
    email: String,
    password: String,
    img: String,
    role: { type: String, default: 'user' }
});
//# sourceMappingURL=auth.schema.js.map