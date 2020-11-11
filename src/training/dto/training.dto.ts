import { IsNotEmpty } from "class-validator";
export class TrainingDto {
    @IsNotEmpty()
    Id: String
    @IsNotEmpty()
    prix: String
    @IsNotEmpty()
    picture: String
    @IsNotEmpty()
    title: String
    @IsNotEmpty()
    Description: String
    @IsNotEmpty()
    nbParticipants: String
    @IsNotEmpty()
    nbHeuresD: String
    @IsNotEmpty()
    nbHeuresND: String
    @IsNotEmpty()
    choice: String
    @IsNotEmpty()
    like: Number
    @IsNotEmpty()
    dislike: Number
    @IsNotEmpty()
    nblike: String
    @IsNotEmpty()
    level:  String
    @IsNotEmpty()
    TrainingCategory: String
}