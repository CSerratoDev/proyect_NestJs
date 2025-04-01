
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt'; 
  import { Request } from 'express';
import { JWT_KEY, TOKEN_NAME } from '../constanst/jwt.constants';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      let token = this.extractTokenFromHeader(request);
      if (!token) {
        token = request.cookies?.[TOKEN_NAME];
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: JWT_KEY
          }
        );
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  