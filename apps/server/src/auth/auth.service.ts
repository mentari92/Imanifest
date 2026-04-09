import { Injectable, UnauthorizedException, ConflictException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "@imanifest/database";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string, name?: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new ConflictException("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        name: name || email.split("@")[0],
        // Store hashed password in quranAuthToken field temporarily
        // In production, add a dedicated password field to schema
        quranAuthToken: `local:${hashedPassword}`,
      },
    });

    const token = this.generateToken(user.id, user.email);
    return { access_token: token, user: { id: user.id, email: user.email, name: user.name } };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !user.quranAuthToken?.startsWith("local:")) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const hashedPassword = user.quranAuthToken.replace("local:", "");
    const valid = await bcrypt.compare(password, hashedPassword);
    if (!valid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const token = this.generateToken(user.id, user.email);
    return { access_token: token, user: { id: user.id, email: user.email, name: user.name } };
  }

  async loginWithQuranOAuth(quranAuthToken: string) {
    // TODO: Exchange code for token with Quran.com OAuth2
    // For now, accept a token and create/update user
    // In production: validate token with Quran.com API, extract user info

    // Placeholder: create user with token-based identifier
    const email = `quran_${Date.now()}@imanifest.app`;
    const user = await this.prisma.user.upsert({
      where: { email },
      update: { quranAuthToken },
      create: {
        email,
        name: "Quran.com User",
        quranAuthToken,
      },
    });

    const token = this.generateToken(user.id, user.email);
    return { access_token: token, user: { id: user.id, email: user.email, name: user.name } };
  }

  async validateUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true },
    });
  }

  private generateToken(userId: string, email: string): string {
    const payload = { sub: userId, email };
    return this.jwtService.sign(payload);
  }
}