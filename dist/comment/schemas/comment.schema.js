"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.commentsSchema = new mongoose_1.Schema({
    id: String,
    name: String,
    date: String,
    contenue: String,
    email: String,
    blog: { type: mongoose_1.Types.ObjectId, ref: 'Blog' },
    replyComment: [{ type: mongoose_1.Types.ObjectId, ref: 'replyComment' }]
});
//# sourceMappingURL=comment.schema.js.map