import { Injectable, Logger, BadRequestException } from "@nestjs/common";
import axios from "axios";

const MIN_SURAH = 1;
const MAX_SURAH = 114;

interface Reciter {
  id: number;
  name: string;
  arabicName: string;
  style: string;
}

interface AudioUrl {
  url: string;
}

@Injectable()
export class SakinahService {
  private readonly logger = new Logger(SakinahService.name);
  private readonly quranAudioBaseUrl = "https://api.quran.com/api/v4";

  /**
   * Get list of reciters from Quran Foundation Audio API.
   */
  async getReciters(): Promise<Reciter[]> {
    try {
      const response = await axios.get(`${this.quranAudioBaseUrl}/resources/recitations`, {
        params: { language: "en" },
        timeout: 10000,
      });

      const data = response.data?.recitations || response.data || [];
      return data.slice(0, 20).map((r: Record<string, unknown>) => ({
        id: r.id as number,
        name: (r.reciter_name as string) || (r.name as string) || "Unknown",
        arabicName: "",
        style: (r.style as string) || "",
      }));
    } catch (error) {
      this.logger.error("Failed to fetch reciters", error);
      // Fallback reciters
      return [
        { id: 7, name: "Mishary Rashid Alafasy", arabicName: "مشاري راشد العفاسي", style: "Murattal" },
        { id: 1, name: "Abdul Basit", arabicName: "عبد الباسط عبد الصمد", style: "Murattal" },
        { id: 3, name: "Abdurrahmaan As-Sudais", arabicName: "عبد الرحمن السديس", style: "Murattal" },
      ];
    }
  }

  /**
   * Get audio URL for a specific reciter + surah.
   */
  async getAudioUrl(reciterId: number, surahNumber: number): Promise<AudioUrl> {
    if (surahNumber < MIN_SURAH || surahNumber > MAX_SURAH) {
      throw new BadRequestException(
        `Invalid surah number: ${surahNumber}. Must be between ${MIN_SURAH} and ${MAX_SURAH}.`,
      );
    }
    if (reciterId <= 0) {
      throw new BadRequestException(`Invalid reciter ID: ${reciterId}. Must be a positive number.`);
    }
    const paddedSurah = String(surahNumber).padStart(3, "0");
    const url = `https://cdn.islamic.network/quran/audio/128/${reciterId}/${paddedSurah}.mp3`;
    return { url };
  }

  /**
   * Get list of all 114 surahs.
   */
  async getSurahs(): Promise<Array<{ number: number; name: string; englishName: string; versesCount: number }>> {
    try {
      const response = await axios.get(`${this.quranAudioBaseUrl}/chapters`, {
        params: { language: "en" },
        timeout: 10000,
      });

      return (response.data?.chapters || []).map(
        (s: Record<string, unknown>) => ({
          number: s.id as number,
          name: s.name_arabic as string,
          englishName: s.name_simple as string,
          versesCount: s.verses_count as number,
        }),
      );
    } catch (error) {
      this.logger.error("Failed to fetch surahs", error);
      // Return minimal fallback
      return Array.from({ length: 114 }, (_, i) => ({
        number: i + 1,
        name: "",
        englishName: `Surah ${i + 1}`,
        versesCount: 0,
      }));
    }
  }
}