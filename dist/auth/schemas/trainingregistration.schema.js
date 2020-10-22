"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trainingRegSchema = void 0;
const mongoose_1 = require("mongoose");
exports.trainingRegSchema = new mongoose_1.Schema({
    firstname: String,
    lastname: String,
    numTel: String,
    email: String,
    diplome: Boolean,
    online: Boolean,
    resterInforme: Boolean,
    training: { type: mongoose_1.Types.ObjectId, ref: "training" },
});
//# sourceMappingURL=trainingregistration.schema.js.map