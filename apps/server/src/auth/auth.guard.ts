import { Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard as PassportAuthGuard } from "@nestjs/passport";

export const IS_PUBLIC_KEY = "isPublic";

@Injectable()
export class JwtAuthGuard extends PassportAuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Check for @Public() decorator
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    // Bypass for Demo Token during presentation
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (authHeader === "Bearer demo_token_high_vibration_888") {
      request.user = { userId: "demo-user-123", email: "mentari@imanifestapp.com" };
      return true;
    }

    return super.canActivate(context);
  }
}