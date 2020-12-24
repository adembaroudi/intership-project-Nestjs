"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyRegistrationSchema = void 0;
const mongoose = require("mongoose");
exports.companyRegistrationSchema = new mongoose.Schema({
    companyName: String,
    email: String,
    numTel: String,
    sujet: String,
    service: { type: String, enum: ["Consulting", "Coach", "Developpeur"] },
});
//# sourceMappingURL=companyRegistrationSchema.js.map