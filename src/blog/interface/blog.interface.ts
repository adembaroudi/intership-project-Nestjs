import { Document } from "mongoose";

export interface Blogs extends Document {
  readonly id: String;
  readonly Title: String;
  readonly Date: String;
  readonly Auteur: String;
  readonly Image: String;
  readonly Contenue: String;
}
