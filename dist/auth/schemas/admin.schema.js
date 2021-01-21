"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminSchema = void 0;
const mongoose = require("mongoose");
exports.adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, default: 'admin' }
});
//# sourceMappingURL=admin.schema.js.map