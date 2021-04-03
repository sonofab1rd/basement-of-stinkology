import { Injectable } from '@nestjs/common';
import { User, UsersService } from '../users/users.service';

export type AuthUser = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<AuthUser> {
    const user = await this.usersService.findOne(username);

    if (user?.password === password) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }
}
