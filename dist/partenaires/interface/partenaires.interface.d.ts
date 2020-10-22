import { Document } from "mongoose";
export interface Partenaires extends Document {
    readonly id: String;
    readonly nomPartenaire: String;
    readonly Logo: String;
}
