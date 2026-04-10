import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImanSyncService } from "./iman-sync.service";
import { AnalyzeDto } from "./dto/analyze.dto";
import { JwtAuthGuard } from "../auth/auth.guard";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

@Controller("iman-sync")
export class ImanSyncController {
  constructor(private readonly imanSyncService: ImanSyncService) {}

  @Post("analyze")
  @UseGuards(JwtAuthGuard)
  async analyze(
    @Request() req: { user: { userId: string } },
    @Body() dto: AnalyzeDto,
  ) {
    return this.imanSyncService.analyze(req.user.userId, dto);
  }

  @Post("analyze-vision")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("image"))
  async analyzeVision(
    @Request() req: { user: { userId: string } },
    @Body("intentText") intentText: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    // Validate intentText
    if (!intentText || intentText.trim().length === 0) {
      throw new BadRequestException("intentText is required");
    }
    if (intentText.length > 500) {
      throw new BadRequestException("intentText must be 500 characters or less");
    }

    // Validate file presence
    if (!file) {
      throw new BadRequestException("Image file is required");
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        "Invalid file type. Only JPG and PNG images are allowed.",
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException(
        "File too large. Maximum size is 5MB.",
      );
    }

    // Convert to base64
    const imageBase64 = file.buffer.toString("base64");
    const imagePath = `vision:${file.originalname}:${Date.now()}`;

    return this.imanSyncService.analyzeVision(
      req.user.userId,
      intentText.trim(),
      imageBase64,
      file.mimetype,
      imagePath,
    );
  }
}