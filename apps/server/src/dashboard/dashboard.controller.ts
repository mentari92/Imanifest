import { Controller, Get, Request } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";

@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get("overview")
  async getOverview(@Request() req: { user: { userId: string } }) {
    try {
      return await this.dashboardService.getOverview(req.user.userId);
    } catch (err: any) {
      // Return empty dashboard if DB is unavailable
      return {
        stats: {
          totalManifestations: 0,
          totalTasks: 0,
          completedTasks: 0,
          currentStreak: 0,
        },
        sentiment7Days: [],
        manifestations: [],
      };
    }
  }
}