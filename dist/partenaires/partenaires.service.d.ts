import { Partenaires } from "./partenaires.model";
import { Model } from "mongoose";
import { PartenairesDto } from "./dto/partenaires.dto";
export declare class partenairesServices {
    private readonly partenairesModel;
    private partenaires;
    constructor(partenairesModel: Model<Partenaires>);
    addPartenaire(partenairesDto: PartenairesDto): Promise<Partenaires>;
    getAllPartenaires(): Promise<Partenaires>;
    getPartenaireById(id: String): Promise<Partenaires>;
    updatePartenaire(id: String, partenairesDto: PartenairesDto): Promise<Partenaires>;
    deletePartenaire(id: String): Promise<Partenaires>;
    logoPartenaire(file: any, id: any): Promise<any>;
    getLogo(id: any): Promise<Partenaires>;
}
