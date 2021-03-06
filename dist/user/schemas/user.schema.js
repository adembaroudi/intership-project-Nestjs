"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersSchema = void 0;
const mongoose_1 = require("mongoose");
exports.usersSchema = new mongoose_1.Schema({
    id: String,
    Firstname: String,
    Lastname: String,
    Datedenaissance: String,
    numTel: String,
    email: String,
    password: String,
    img: String,
    role: { type: String, enum: ["Coach", "Developpeur", "Program manager", "social relationship", "CEO", "co-founder", "designeur"] },
    trainings: [{ type: mongoose_1.Types.ObjectId, ref: 'trainings' }]
});
//# sourceMappingURL=user.schema.js.map