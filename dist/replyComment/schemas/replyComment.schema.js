"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaycommentsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.replaycommentsSchema = new mongoose_1.Schema({
    id: String,
    name: String,
    date: String,
    contenue: String,
    email: String,
    comment: { type: mongoose_1.Types.ObjectId, ref: 'Comment' },
});
//# sourceMappingURL=replyComment.schema.js.map