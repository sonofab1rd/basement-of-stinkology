import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { Request as ExpressRequest } from 'express';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService, AuthUser } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: ExpressRequest) {
    if (!req.user) {
      return;
    }

    // TODO: Remove type assertion for proper req typing
    return this.authService.login(req.user as AuthUser);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  getProfile(@Request() req) {
    console.log('getProfile', req);
    return {
      profile: {
        userId: '1',
        tag: 'tag',
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        password: 'password',
      },
    };
  }

  // @UseGuards(JwtAuthGuard)
  @Post('profile')
  setProfile(@Request() req) {
    console.log('postProfile', req);
    return {
      profile: {
        userId: '1',
        tag: 'tag',
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        password: 'password',
      },
    };
  }
}
