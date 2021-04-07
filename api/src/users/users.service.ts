import { Injectable } from '@nestjs/common';

export type User = {
  userId: string;
  email: string;
  password: string;
};

const users: readonly User[] = [
  {
    userId: '1',
    email: 'test@email.com',
    password: 'abc123',
  },
];

@Injectable()
export class UsersService {
  async findOne(email: string): Promise<User | undefined> {
    return users.find((user) => user.email === email);
  }
}
