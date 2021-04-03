import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate a known user', async () => {
    await expect(service.validateUser('john', 'changeme')).resolves.toEqual({
      userId: 1,
      username: 'john',
    });
  });

  it('should not validate a known user with an incorrect password', async () => {
    await expect(
      service.validateUser('john', 'wrong-password'),
    ).resolves.toBeNull();
  });

  it('should not validate an uknown user', async () => {
    await expect(
      service.validateUser('unkown-user', 'wrong-password'),
    ).resolves.toBeNull();
  });
});
