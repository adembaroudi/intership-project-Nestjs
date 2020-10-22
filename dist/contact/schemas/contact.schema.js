"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.contactsSchema = new mongoose_1.Schema({
    id: String,
    name: String,
    subject: String,
    email: String,
    contenuMessage: String,
    emailPassword: String
});
//# sourceMappingURL=contact.schema.js.map