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

export type Payload = JwtPayload & Pick<AuthUser, 'email'>;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<AuthUser> {
    const user = await this.usersService.findOne(email);

    if (user?.password === password) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login({ email, userId }: AuthUser) {
    const payload: Payload = { email, sub: userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
