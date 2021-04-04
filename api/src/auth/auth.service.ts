import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UsersService } from '../users/users.service';

export type AuthUser = Omit<User, 'password'>;

interface JwtPayload {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}

export type Payload = JwtPayload & Pick<AuthUser, 'username'>;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<AuthUser> {
    const user = await this.usersService.findOne(username);

    if (user?.password === password) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login({ username, userId }: AuthUser) {
    const payload: Payload = { username, sub: userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
