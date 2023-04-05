import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { hash } from 'bcrypt';
//import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'super-secret' //jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const user = await User.findOne({where:{id:payload.sub}})
    
    return user;
    return await { userId: payload.sub, username: payload.username };
  }
}
