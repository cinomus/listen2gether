import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import * as config from 'config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const cookies = req.cookies;
      if (!cookies.authentication || !cookies.refresh) {
        throw new UnauthorizedException();
      }
      const accessToken = this.jwtService.verify(cookies.authentication, {
        secret: config.get('JWT_ACCESS_TOKEN_SECRET'),
      });
      const refreshToken = this.jwtService.verify(cookies.refresh, {
        secret: config.get('JWT_REFRESH_TOKEN_SECRET'),
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
