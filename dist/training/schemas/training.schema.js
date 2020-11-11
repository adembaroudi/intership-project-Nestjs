"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trainingsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.trainingsSchema = new mongoose_1.Schema({
    Id: String,
    prix: String,
    picture: String,
    title: String,
    Description: String,
    nbParticipants: String,
    nbHeuresD: String,
    nbHeuresND: String,
    choice: { type: String, default: "" },
    nblike: { type: Number, default: 0 },
    level: { type: String, enum: ["Begginer", "Intermediate", "Advanced"] },
    TrainingCategory: {
        type: String,
        enum: ["Web_Development", "Data_Science", "AI"],
    },
    trainingRegistrations: [
        { type: mongoose_1.Types.ObjectId, ref: "trainingRegistrations" },
    ],
    user: { type: mongoose_1.Types.ObjectId, ref: "user" },
});
//# sourceMappingURL=training.schema.js.map