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

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // @UseGuards(JwtAuthGuard)
  @Post('date-plan')
  setWeekendOptions(@Request() req) {
    return '';
  }
}
