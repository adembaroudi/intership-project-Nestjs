"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partenairesSchema = void 0;
const mongoose = require("mongoose");
exports.partenairesSchema = new mongoose.Schema({
    id: String,
    nomPartenaire: String,
    Logo: String,
});
//# sourceMappingURL=partenaires.schema.js.map