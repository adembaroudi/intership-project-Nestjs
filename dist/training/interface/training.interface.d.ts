import { Document } from "mongoose";
export interface Trainings extends Document {
    readonly Id: String;
    readonly prix: String;
    readonly picture: String;
    readonly title: String;
    readonly Description: String;
    readonly nbParticipants: String;
    readonly nbHeuresD: String;
    readonly nbHeuresND: String;
    readonly nblike: String;
    readonly level: String;
    readonly TrainingCategory: String;
}
