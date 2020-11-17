import { TokenDto } from "./dto/token.dto";
import { VoteurDto } from "./dto/voteur.dto";
import { voteurService } from "./voteur.service";
export declare class voteurController {
    private voteurService;
    constructor(voteurService: voteurService);
    vote(voteurDto: VoteurDto, res: any): Promise<any>;
    sendToken(res: any, tokenDto: TokenDto): Promise<any>;
    voteTrain(id: String, idvot: String, res: any): Promise<any>;
    getAlltrainings(): Promise<import("./voteur.model").Voteur>;
    getbyId(id: String): Promise<import("./voteur.model").Voteur>;
}
