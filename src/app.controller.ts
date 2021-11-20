import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './authentication/localAuthGuard';
import { AuthService } from './authentication/auth.service';
import { JwtAuthGuard } from './authentication/jwt-auth.guard';

@Controller()
export class AppController {
  @Get('profile')
  getProfile(@Request() req) {
    console.log('profile', req.user);
    return { status: 'чики пуки бамбони' };
  }
}
