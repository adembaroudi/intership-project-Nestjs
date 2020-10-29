"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.blogsSchema = new mongoose_1.Schema({
    id: String,
    Title: String,
    date: String,
    auteur: String,
    image: String,
    Contenue: String,
    comment: [{ type: mongoose_1.Types.ObjectId, ref: 'comment' }],
});
//# sourceMappingURL=blog.schema.js.map