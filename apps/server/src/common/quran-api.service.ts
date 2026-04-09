import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";

interface QuranSearchResult {
  verse_key: string;
  text: string; // Arabic text
  translations?: {
    text: string;
    resource_id: number;
  }[];
}

interface QuranVerseResponse {
  verse: {
    verse_key: string;
    text_uthmani: string;
    translations?: {
      text: string;
      resource_id: number;
    }[];
  };
}

interface TafsirResponse {
  tafsir?: {
    text: string;
    resource_id: number;
  };
}

export interface VerseResult {
  verseKey: string;
  arabicText: string;
  translation: string;
  tafsirSnippet: string;
}

/**
 * Quran Foundation Content API client.
 * Searches verses, fetches translations, and retrieves tafsir.
 */
@Injectable()
export class QuranApiService {
  private readonly logger = new Logger(QuranApiService.name);
  private readonly baseUrl =
    process.env.QURAN_API_BASE_URL || "https://api.quran.com/api/v4";
  private readonly apiKey = process.env.QURAN_FOUNDATION_API_KEY || "";

  /**
   * Search for verses matching a query, returning up to 3 results.
   * Uses the English translation (resource_id: 131 = Dr. Mustafa Khattab).
   */
  async searchVerses(query: string, size = 3): Promise<VerseResult[]> {
    try {
      const response = await axios.get<{
        search: { results: QuranSearchResult[] };
      }>(`${this.baseUrl}/search`, {
        params: {
          q: query,
          size,
          language: "en",
          translations: 131, // Dr. Mustafa Khattab
        },
        headers: this.getHeaders(),
        timeout: 10000,
      });

      const results = response.data?.search?.results || [];
      const verseResults: VerseResult[] = [];

      for (const result of results.slice(0, size)) {
        const translation =
          result.translations?.find((t) => t.resource_id === 131)?.text ||
          result.translations?.[0]?.text ||
          "Translation unavailable";

        // Fetch tafsir for each verse
        const tafsirSnippet = await this.getTafsir(result.verse_key);

        verseResults.push({
          verseKey: result.verse_key,
          arabicText: result.text,
          translation: this.stripHtmlTags(translation),
          tafsirSnippet,
        });
      }

      return verseResults;
    } catch (error) {
      this.logger.error("Failed to search verses", error);
      return [];
    }
  }

  /**
   * Get tafsir snippet for a specific verse (Ibn Kathir).
   * Returns max 300 characters.
   */
  async getTafsir(verseKey: string): Promise<string> {
    try {
      const response = await axios.get<TafsirResponse>(
        `${this.baseUrl}/tafsirs/en-tafisr-ibn-kathir/by_ayah/${verseKey}`,
        {
          headers: this.getHeaders(),
          timeout: 10000,
        },
      );

      const tafsirText =
        response.data?.tafsir?.text || "Tafsir unavailable";
      const cleaned = this.stripHtmlTags(tafsirText);
      return cleaned.length > 300
        ? cleaned.substring(0, 300) + "..."
        : cleaned;
    } catch (error) {
      this.logger.warn(`Failed to fetch tafsir for ${verseKey}`, error);
      return "Tafsir unavailable";
    }
  }

  /**
   * Get a specific verse with its Arabic text and English translation.
   */
  async getVerseWithTranslation(verseKey: string): Promise<VerseResult | null> {
    try {
      const response = await axios.get<QuranVerseResponse>(
        `${this.baseUrl}/verses/by_key/${verseKey}`,
        {
          params: {
            translations: 131, // Dr. Mustafa Khattab
            fields: "text_uthmani",
          },
          headers: this.getHeaders(),
          timeout: 10000,
        },
      );

      const verse = response.data?.verse;
      if (!verse) return null;

      const translation =
        verse.translations?.find((t) => t.resource_id === 131)?.text ||
        verse.translations?.[0]?.text ||
        "Translation unavailable";

      const tafsirSnippet = await this.getTafsir(verseKey);

      return {
        verseKey: verse.verse_key,
        arabicText: verse.text_uthmani || "",
        translation: this.stripHtmlTags(translation),
        tafsirSnippet,
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch verse ${verseKey}`,
        error,
      );
      return null;
    }
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (this.apiKey) {
      headers["x-api-key"] = this.apiKey;
    }
    return headers;
  }

  private stripHtmlTags(html: string): string {
    return html
      .replace(/<[^>]*>/g, "")
      .replace(/&/g, "&")
      .replace(/</g, "<")
      .replace(/>/g, ">")
      .replace(/"/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
  }
}