import { PrismaClient } from "@prisma/client";

/**
 * Raw PrismaClient singleton.
 * Use in: seed scripts, CLI tools, any non-NestJS context.
 * Do NOT use in NestJS services — inject PrismaService instead.
 */
const prisma = new PrismaClient();

export { PrismaClient, prisma };

/**
 * NestJS Injectable PrismaService with lifecycle hooks.
 * Use in: NestJS controllers, services, guards (via DI).
 * Registered globally by DatabaseModule — inject with `constructor(private prisma: PrismaService)`.
 */
export { PrismaService } from "./prisma.service";

/**
 * Global NestJS module that provides PrismaService.
 * Import once in AppModule — available everywhere via DI.
 */
export { DatabaseModule } from "./database.module";