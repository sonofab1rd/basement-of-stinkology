import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a known user', async () => {
    await expect(service.findOne('test@email.com')).resolves.toEqual({
      userId: '1',
      email: 'test@email.com',
      password: 'abc123',
    });
  });

  it('should not find an unknown user', async () => {
    await expect(service.findOne('who-are-you')).resolves.toBeUndefined();
  });
});
