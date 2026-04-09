import { Controller, Post, Body, UseGuards, Request } from "@nestjs/common";
import { ImanSyncService } from "./iman-sync.service";
import { AnalyzeDto } from "./dto/analyze.dto";
import { JwtAuthGuard } from "../auth/auth.guard";

@Controller("iman-sync")
export class ImanSyncController {
  constructor(private readonly imanSyncService: ImanSyncService) {}

  @Post("analyze")
  @UseGuards(JwtAuthGuard)
  async analyze(@Request() req: { user: { userId: string } }, @Body() dto: AnalyzeDto) {
    return this.imanSyncService.analyze(req.user.userId, dto);
  }
}