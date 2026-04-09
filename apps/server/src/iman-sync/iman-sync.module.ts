import { Module } from "@nestjs/common";
import { ImanSyncController } from "./iman-sync.controller";
import { ImanSyncService } from "./iman-sync.service";
import { ZhipuService } from "../common/zhipu.service";
import { QuranApiService } from "../common/quran-api.service";

@Module({
  controllers: [ImanSyncController],
  providers: [ImanSyncService, ZhipuService, QuranApiService],
})
export class ImanSyncModule {}