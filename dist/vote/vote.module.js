"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.voteModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const training_schema_1 = require("../training/schemas/training.schema");
const vote_schema_1 = require("./schema/vote.schema");
const vote_controller_1 = require("./vote.controller");
const vote_service_1 = require("./vote.service");
let voteModule = class voteModule {
};
voteModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: "vote", schema: vote_schema_1.votesSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: "trainings", schema: training_schema_1.trainingsSchema }])
        ],
        controllers: [vote_controller_1.voteController],
        providers: [vote_service_1.voteService],
    })
], voteModule);
exports.voteModule = voteModule;
//# sourceMappingURL=vote.module.js.map