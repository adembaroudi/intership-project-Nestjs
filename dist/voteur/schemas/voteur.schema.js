"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voteurSchema = void 0;
const mongoose_1 = require("mongoose");
exports.voteurSchema = new mongoose_1.Schema({
    id: String,
    email: String,
    choice: { type: String, default: "like" },
    trainings: [{ type: mongoose_1.Types.ObjectId, ref: 'trainings' }],
});
//# sourceMappingURL=voteur.schema.js.map