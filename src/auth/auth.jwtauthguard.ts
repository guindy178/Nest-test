import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Invalid or missing JWT token');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.user = payload; // Attach the user object to the request for later use
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token หมดอายุ หรือเกิดข้อผิดพลาดกรุณาล็อคอินใหม่');
    }
  }

  private extractTokenFromHeader(request): string | undefined {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }
    return undefined;
  }
}
