import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  private _connected = false;

  get isConnected() {
    return this._connected;
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this._connected = true;
      this.logger.log("✅ Database connected successfully");
    } catch (err: any) {
      this._connected = false;
      this.logger.warn(
        `⚠️ Database connection failed — running in demo mode without persistence: ${err?.message || err}`,
      );
    }
  }

  async onModuleDestroy() {
    if (this._connected) {
      await this.$disconnect();
    }
  }
}