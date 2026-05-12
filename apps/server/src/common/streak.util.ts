import { PrismaService } from "@imanifest/database";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const STREAK_LOOKBACK_DAYS = 35;

/**
 * Calculate consecutive-day streak from reflections.
 * Deduplicates to one entry per calendar day (UTC), then counts
 * how many days in a row lead up to today/yesterday.
 */
export async function calculateReflectionStreak(
  prisma: PrismaService,
  userId: string,
): Promise<number> {
  const lookbackDate = new Date(Date.now() - STREAK_LOOKBACK_DAYS * ONE_DAY_MS);

  const reflections = await prisma.reflection.findMany({
    where: {
      userId,
      streakDate: { gte: lookbackDate },
    },
    orderBy: { streakDate: "desc" },
    select: { streakDate: true },
  });

  if (reflections.length === 0) return 0;

  // Deduplicate: keep one entry per calendar day (UTC)
  const uniqueDays = [
    ...new Set(
      reflections.map((r) =>
        new Date(r.streakDate).toISOString().slice(0, 10),
      ),
    ),
  ].sort((a, b) => (a > b ? -1 : 1)); // descending

  const todayUTC = new Date().toISOString().slice(0, 10);
  const yesterdayUTC = new Date(Date.now() - ONE_DAY_MS)
    .toISOString()
    .slice(0, 10);

  // Streak must include today or yesterday to be active
  if (uniqueDays[0] !== todayUTC && uniqueDays[0] !== yesterdayUTC) return 0;

  let streak = 1;
  for (let i = 1; i < uniqueDays.length; i++) {
    const prev = new Date(uniqueDays[i - 1]).getTime();
    const curr = new Date(uniqueDays[i]).getTime();
    if (prev - curr === ONE_DAY_MS) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}