"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRegistrationSchema = void 0;
const mongoose = require("mongoose");
exports.serviceRegistrationSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    numTel: String,
    cv: String,
    sujet: String,
    service: { type: String, enum: ["Consulting", "Coaching", " Web_Developpement"] },
});
//# sourceMappingURL=serviceRegistration.schema.js.map