"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.voteurModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const training_schema_1 = require("../training/schemas/training.schema");
const voteur_schema_1 = require("./schemas/voteur.schema");
const voteur_controller_1 = require("./voteur.controller");
const voteur_service_1 = require("./voteur.service");
let voteurModule = class voteurModule {
};
voteurModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: "voteur", schema: voteur_schema_1.voteurSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: "trainings", schema: training_schema_1.trainingsSchema }])
        ],
        controllers: [voteur_controller_1.voteurController],
        providers: [voteur_service_1.voteurService],
    })
], voteurModule);
exports.voteurModule = voteurModule;
//# sourceMappingURL=voteur.module.js.map