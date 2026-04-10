import { Injectable, Logger } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "@imanifest/database";
import { ZhipuService } from "../common/zhipu.service";
import { QuranApiService, VerseResult } from "../common/quran-api.service";
import { AnalyzeDto } from "./dto/analyze.dto";

export interface AnalyzeResult {
  manifestationId: string;
  verses: VerseResult[];
  aiSummary: string;
}

export interface AnalyzeVisionResult extends AnalyzeResult {
  imagePath: string;
}

/**
 * ImanSync service — orchestrates the full text analysis flow:
 * 1. Extract themes from intent via GLM-5
 * 2. Search Quran verses matching themes
 * 3. Fetch tafsir for each verse
 * 4. Generate AI summary via GLM-5
 * 5. Save to Manifestation table
 */
@Injectable()
export class ImanSyncService {
  private readonly logger = new Logger(ImanSyncService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly zhipu: ZhipuService,
    private readonly quranApi: QuranApiService,
  ) {}

  /**
   * Full ImanSync text analysis pipeline.
   * Target: < 8 seconds response time.
   */
  async analyze(
    userId: string,
    dto: AnalyzeDto,
  ): Promise<AnalyzeResult> {
    const startTime = Date.now();

    // Step 1: Extract spiritual themes from intent text
    this.logger.log(`Extracting themes for user ${userId}`);
    const themes = await this.zhipu.extractThemes(dto.intentText);
    this.logger.log(`Themes extracted: ${themes.join(", ")}`);

    // Step 2: Search Quran verses in parallel for all themes, collect unique results
    this.logger.log("Searching Quran verses...");
    const allVerses: VerseResult[] = [];
    const seenKeys = new Set<string>();

    const searchResults = await Promise.all(
      themes.map((theme) => this.quranApi.searchVerses(theme, 3)),
    );

    for (const results of searchResults) {
      for (const verse of results) {
        if (!seenKeys.has(verse.verseKey) && allVerses.length < 3) {
          seenKeys.add(verse.verseKey);
          allVerses.push(verse);
        }
      }
      if (allVerses.length >= 3) break;
    }

    // If no verses found from API, create fallback
    if (allVerses.length === 0) {
      this.logger.warn("No verses found from Quran API, using empty fallback");
    }

    // Step 3: Generate AI summary
    this.logger.log("Generating AI summary...");
    const aiSummary = await this.zhipu.generateSummary(
      dto.intentText,
      allVerses.map((v) => ({ verseKey: v.verseKey, translation: v.translation })),
    );

    // Step 4: Save to Manifestation table
    const manifestation = await this.prisma.manifestation.create({
      data: {
        userId,
        intentText: dto.intentText,
        verses: allVerses.length > 0 ? (allVerses as unknown as Prisma.InputJsonValue) : Prisma.DbNull,
        aiSummary,
      },
    });

    const elapsed = Date.now() - startTime;
    this.logger.log(
      `Analysis complete in ${elapsed}ms — manifestation ${manifestation.id}`,
    );

    return {
      manifestationId: manifestation.id,
      verses: allVerses,
      aiSummary,
    };
  }

  /**
   * ImanSync vision analysis pipeline — image + text via GLM-5V.
   * Target: < 12 seconds response time.
   */
  async analyzeVision(
    userId: string,
    intentText: string,
    imageBase64: string,
    mimeType: string,
    imagePath: string,
  ): Promise<AnalyzeVisionResult> {
    const startTime = Date.now();

    // Step 1: Extract spiritual themes from image + text via GLM-5V
    this.logger.log(`Extracting vision themes for user ${userId}`);
    const themes = await this.zhipu.extractThemesVision(
      intentText,
      imageBase64,
      mimeType,
    );
    this.logger.log(`Vision themes extracted: ${themes.join(", ")}`);

    // Step 2: Search Quran verses (same as text flow)
    this.logger.log("Searching Quran verses for vision analysis...");
    const allVerses: VerseResult[] = [];
    const seenKeys = new Set<string>();

    const searchResults = await Promise.all(
      themes.map((theme) => this.quranApi.searchVerses(theme, 3)),
    );

    for (const results of searchResults) {
      for (const verse of results) {
        if (!seenKeys.has(verse.verseKey) && allVerses.length < 3) {
          seenKeys.add(verse.verseKey);
          allVerses.push(verse);
        }
      }
      if (allVerses.length >= 3) break;
    }

    if (allVerses.length === 0) {
      this.logger.warn("No verses found from Quran API for vision analysis");
    }

    // Step 3: Generate AI summary
    this.logger.log("Generating AI summary for vision analysis...");
    const aiSummary = await this.zhipu.generateSummary(
      intentText,
      allVerses.map((v) => ({ verseKey: v.verseKey, translation: v.translation })),
    );

    // Step 4: Save to Manifestation table with imagePath
    const manifestation = await this.prisma.manifestation.create({
      data: {
        userId,
        intentText,
        imagePath,
        verses: allVerses.length > 0 ? (allVerses as unknown as Prisma.InputJsonValue) : Prisma.DbNull,
        aiSummary,
      },
    });

    const elapsed = Date.now() - startTime;
    this.logger.log(
      `Vision analysis complete in ${elapsed}ms — manifestation ${manifestation.id}`,
    );

    return {
      manifestationId: manifestation.id,
      verses: allVerses,
      aiSummary,
      imagePath,
    };
  }
}
