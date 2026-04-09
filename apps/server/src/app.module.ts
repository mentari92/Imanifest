import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { DatabaseModule } from "@imanifest/database";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/auth.guard";
import { ImanSyncModule } from "./iman-sync/iman-sync.module";

@Module({
  imports: [DatabaseModule, AuthModule, ImanSyncModule],
  controllers: [],
  providers: [
    // Apply JWT guard globally — use @Public() to skip
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}