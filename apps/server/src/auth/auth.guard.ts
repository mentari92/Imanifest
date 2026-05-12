import { Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard as PassportAuthGuard } from "@nestjs/passport";

export const IS_PUBLIC_KEY = "isPublic";
const AUTH_DISABLED = process.env.AUTH_DISABLED === "true";

@Injectable()
export class JwtAuthGuard extends PassportAuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check for @Public() decorator
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (AUTH_DISABLED) {
      const req = context.switchToHttp().getRequest();
      req.user = {
        userId: "demo-user-hackathon",
        email: "demo@imanifestapp.com",
      };
      return true;
    }

    if (isPublic) {
      // For public routes, still try to extract the user from JWT if a token is
      // present — so data is attributed to the real user, not the demo fallback.
      const req = context.switchToHttp().getRequest();
      const hasToken = typeof req.headers?.authorization === "string" &&
        req.headers.authorization.startsWith("Bearer ");
      if (hasToken) {
        try {
          await super.canActivate(context);
        } catch {
          // Invalid / expired token on a public route — continue as unauthenticated.
        }
      }
      return true;
    }

    return super.canActivate(context) as Promise<boolean>;
  }
}