import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";

/**
 * GLM-5 (Zhipu AI) client for ImanSync text analysis.
 * Handles theme extraction and verse summary generation.
 */
@Injectable()
export class ZhipuService {
  private readonly logger = new Logger(ZhipuService.name);
  private readonly apiKey = process.env.ZHIPU_API_KEY || "";
  private readonly baseUrl = "https://open.bigmodel.cn/api/paas/v4";

  /**
   * Extract 3 Islamic spiritual themes from intent text using GLM-5.
   */
  async extractThemes(intentText: string): Promise<string[]> {
    const systemPrompt = `You are an Islamic spiritual guide and Quran scholar.
Extract the 3 most relevant Islamic spiritual themes from the user's intention.
Return ONLY a valid JSON array of English keywords.
Example: ["tawakkul","sabr","shukr"]
Do not include any explanation or extra text.`;

    try {
      const response = await this.callGLM5(systemPrompt, intentText);
      const parsed = this.parseJSONResponse<string[]>(response);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.slice(0, 3);
      }
      this.logger.warn("Unexpected themes response, using fallback");
      return ["tawakkul", "sabr", "shukr"];
    } catch (error) {
      this.logger.error("Failed to extract themes", error);
      return ["tawakkul", "sabr", "shukr"];
    }
  }

  /**
   * Generate a 2-sentence spiritual validation summary using GLM-5.
   */
  async generateSummary(
    intentText: string,
    verses: { verseKey: string; translation: string }[],
  ): Promise<string> {
    const versesContext = verses
      .map((v) => `${v.verseKey}: ${v.translation}`)
      .join("\n");

    const systemPrompt = `You are a warm, knowledgeable Islamic life coach.
Given the user's intention and 3 related Quranic verses, write a 2-sentence spiritual 
validation in English — affirming their intention through the lens of these verses.
Be sincere and specific to the actual verses. Avoid generic phrasing.`;

    const userMessage = `Intention: ${intentText}\n\nVerses:\n${versesContext}`;

    try {
      const response = await this.callGLM5(systemPrompt, userMessage);
      return response.trim();
    } catch (error) {
      this.logger.error("Failed to generate summary", error);
      return "Your intention aligns with the Quranic guidance of striving for what is good. May Allah bless your journey.";
    }
  }

  /**
   * Core GLM-5 API call via OpenAI-compatible endpoint.
   */
  private async callGLM5(
    systemPrompt: string,
    userMessage: string,
  ): Promise<string> {
    const response = await axios.post(
      `${this.baseUrl}/chat/completions`,
      {
        model: "glm-4-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      },
    );

    return response.data?.choices?.[0]?.message?.content || "";
  }

  /**
   * Parse JSON from GLM-5 response (handles markdown code blocks).
   */
  private parseJSONResponse<T>(text: string): T {
    // Strip markdown code blocks if present
    const cleaned = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    return JSON.parse(cleaned) as T;
  }
}