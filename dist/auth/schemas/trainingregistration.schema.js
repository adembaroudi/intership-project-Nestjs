"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trainingRegSchema = void 0;
const mongoose_1 = require("mongoose");
exports.trainingRegSchema = new mongoose_1.Schema({
    firstname: String,
    lastname: String,
    numTel: String,
    email: String,
    diplome: String,
    online: String,
    typePresence: { type: String, enum: ["quotidien", "week-end"] },
    programme: {
        type: String,
        enum: [
            "FullStack Web(Dans la peau d’un développeur Web)",
            "Angular/ReactJS",
            "NodeJs/JavaJee/Spring",
            "FullStack Web(Dans la peau d’un ingenieur DevOps)",
            "Business Intelligence",
            "DATA SCIENCE/DEEP LEARNING",
        ],
    },
    training: { type: mongoose_1.Types.ObjectId, ref: "training" },
});
//# sourceMappingURL=trainingregistration.schema.js.map