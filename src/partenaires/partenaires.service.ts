import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Partenaires } from "./partenaires.model";
import { Model } from "mongoose";
import { PartenairesDto } from "./dto/partenaires.dto";


@Injectable()
export class partenairesServices {
    private partenaires: Partenaires[] = [];
    constructor(@InjectModel('partenaires')private readonly partenairesModel : Model<Partenaires>){}
async addPartenaire(partenairesDto : PartenairesDto):Promise<Partenaires>{
    const partenaire = await this.partenairesModel.create(partenairesDto);
    return partenaire;
}
async getAllPartenaires():Promise<Partenaires>{
    const getAll = await this.partenairesModel.find()
    return getAll;
}
async getPartenaireById(id :String):Promise<Partenaires>{
    const getId = await this.partenairesModel.findById(id);
    return getId;
}
async updatePartenaire(id :String , partenairesDto : PartenairesDto):Promise<Partenaires>{
    const updatePartenaire = await this.partenairesModel.findByIdAndUpdate(id , partenairesDto);
    return updatePartenaire;
}
async deletePartenaire (id : String):Promise<Partenaires>{
    const partToDelete = await this.partenairesModel.findByIdAndDelete(id);
    return partToDelete;
}
}