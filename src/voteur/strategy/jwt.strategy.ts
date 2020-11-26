import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { voteurService } from '../voteur.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private voteurService: voteurService){

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'thisismykickasssecretthatiwilltotallychangelater'
        });

    }

    async validate(payload: JwtPayload){

        const user = await this.voteurService.validateUserByJwt(payload);

        if(!user){
            throw new UnauthorizedException();
        }

        return user;

    }

}