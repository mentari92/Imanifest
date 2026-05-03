import { Module } from "@nestjs/common";
import { QalbController } from "./qalb.controller";
import { QalbService } from "./qalb.service";
import { AiService } from "../common/ai.service";

@Module({
  controllers: [QalbController],
  providers: [QalbService, AiService],
})
export class QalbModule {}