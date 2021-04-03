import { getMockReq } from '@jest-mock/express';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthUser } from './auth/auth.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });

    it('should return "undefined" when request has no user', async () => {
      const req = getMockReq();
      await expect(appController.login(req)).resolves.toBeUndefined();
    });

    it('should return the resquest user', async () => {
      const user: AuthUser = {
        userId: 1,
        username: 'sonofab1rd',
      };
      const req = getMockReq({
        user,
      });

      await expect(appController.login(req)).resolves.toBe(user);
    });
  });
});
