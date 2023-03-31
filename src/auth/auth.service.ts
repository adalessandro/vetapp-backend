import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async genAccessToken(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(username, pass) {
    const user = await this.usersService.findOneBy({ username });
    const passwordIsValid = await bcrypt.compare(pass, user?.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException();
    }
    return this.genAccessToken(user);
  }

  async signUp(username, password) {
    const user = await this.usersService.create({
      username,
      password,
    });
    return this.genAccessToken(user);
  }
}
