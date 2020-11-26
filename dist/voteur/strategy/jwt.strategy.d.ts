import { JwtPayload } from '../interface/jwt-payload.interface';
import { voteurService } from '../voteur.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private voteurService;
    constructor(voteurService: voteurService);
    validate(payload: JwtPayload): Promise<string>;
}
export {};
