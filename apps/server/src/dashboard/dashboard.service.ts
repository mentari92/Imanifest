import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@imanifest/database';
import { QuranApiService } from '../common/quran-api.service';
import { calculateReflectionStreak } from '../common/streak.util';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(
    private prisma: PrismaService,
    private quranApiService: QuranApiService,
  ) {}

  async getOverview(userId: string) {
    if (!this.prisma.isConnected) {
      this.logger.warn('Database disconnected. Returning fallback dashboard payload.');
      return this.buildFallbackOverview(userId);
    }

    try {
    // Fetch user info
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    });

    // Fetch stats in parallel
    const [
      totalIntentions,
      totalJournalEntries,
      totalDuaTasks,
      completedDuaTasks,
      streakCount,
      recentImanifest,
      recentQalb,
      recentDuaTasks,
    ] = await Promise.all([
      this.prisma.manifestation.count({ where: { userId } }),
      this.prisma.reflection.count({ where: { userId } }),
      this.prisma.task.count({
        where: {
          manifestation: { userId },
        },
      }),
      this.prisma.task.count({
        where: {
          isCompleted: true,
          manifestation: { userId },
        },
      }),
      calculateReflectionStreak(this.prisma, userId),
      this.prisma.manifestation.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: { id: true, intentText: true, createdAt: true },
        take: 3,
      }),
      this.prisma.reflection.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: { id: true, transcriptText: true, createdAt: true },
        take: 3,
      }),
      this.prisma.task.findMany({
        where: { isCompleted: true, manifestation: { userId } },
        orderBy: { updatedAt: 'desc' },
        select: { id: true, description: true, updatedAt: true },
        take: 3,
      }),
    ]);

    // Build recent activity list
    const recentActivity = [
      ...recentImanifest.map((r: any) => ({
        id: r.id,
        type: 'imanifest',
        title:
          (r.intentText || '').substring(0, 50) +
          ((r.intentText || '').length > 50 ? '...' : ''),
        createdAt: r.createdAt,
      })),
      ...recentQalb.map((r: any) => ({
        id: r.id,
        type: 'qalb',
        title:
          (r.transcriptText || '').substring(0, 50) +
          ((r.transcriptText || '').length > 50 ? '...' : ''),
        createdAt: r.createdAt,
      })),
      ...recentDuaTasks.map((t: any) => ({
        id: t.id,
        type: 'dua',
        title:
          (t.description || '').substring(0, 50) +
          ((t.description || '').length > 50 ? '...' : ''),
        createdAt: t.updatedAt,
      })),
    ]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 5);

    // Get verse of the day
    let verseOfTheDay = null;
    try {
      const randomVerse = await this.quranApiService.getRandomAyah();
      if (randomVerse) {
        verseOfTheDay = {
          number: randomVerse.number,
          text: randomVerse.text,
          surahName: randomVerse.surah?.englishName || '',
          surahNumber: randomVerse.surah?.number || 0,
          ayahNumber: randomVerse.numberInSurah || 0,
        };
      }
    } catch (error) {
      this.logger.warn(
        `Failed to get verse of the day: ${error instanceof Error ? error.message : error}`,
      );
    }

    return {
      user: user || { id: userId, name: 'Muslim', email: '' },
      stats: {
        totalIntentions,
        totalJournalEntries,
        totalDuaTasks,
        completedDuaTasks,
        currentStreak: streakCount,
        longestStreak: streakCount,
      },
      recentActivity,
      verseOfTheDay,
    };
    } catch (error) {
      this.logger.warn(
        `Failed to build dashboard from DB. Returning fallback payload: ${error instanceof Error ? error.message : error}`,
      );
      return this.buildFallbackOverview(userId);
    }
  }

  private async buildFallbackOverview(userId: string) {
    let verseOfTheDay = null;
    try {
      const randomVerse = await this.quranApiService.getRandomAyah();
      if (randomVerse) {
        verseOfTheDay = {
          number: randomVerse.number,
          text: randomVerse.text,
          surahName: randomVerse.surah?.englishName || '',
          surahNumber: randomVerse.surah?.number || 0,
          ayahNumber: randomVerse.numberInSurah || 0,
        };
      }
    } catch {
      // Non-critical in fallback mode.
    }

    return {
      user: { id: userId, name: 'Muslim', email: '' },
      stats: {
        totalIntentions: 0,
        totalJournalEntries: 0,
        totalDuaTasks: 0,
        completedDuaTasks: 0,
        currentStreak: 0,
        longestStreak: 0,
      },
      recentActivity: [],
      verseOfTheDay,
    };
  }
}