import { PartenairesDto } from "./dto/partenaires.dto";
import { partenairesServices } from "./partenaires.service";
export declare class partenairesController {
    private partService;
    constructor(partService: partenairesServices);
    addPartenaire(partDto: PartenairesDto, res: any): Promise<any>;
    getAllPartenaires(): Promise<import("./partenaires.model").Partenaires>;
    getPartenaire(id: String): Promise<import("./partenaires.model").Partenaires>;
    updatepartenaire(id: String, res: any, partDto: PartenairesDto): Promise<any>;
    deletePartenaire(id: String, res: any): Promise<any>;
}
