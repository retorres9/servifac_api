import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type{ USER_REPOSITORY } from 'src/core/users/domain/repository/user.repository';
import { JwtPayload } from '../domain/jwt.payload';
import { User } from 'src/core/users/domain/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(USER_REPOSITORY)
    private readonly userRepository: typeof USER_REPOSITORY
  ) {
    super({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET?.toString() || 'default_secret_key',
    });
  }

  async validate(payload: JwtPayload) {
    const { user_username } = payload;
    const user: User = await this.userRepository.findOne({ user_username });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}