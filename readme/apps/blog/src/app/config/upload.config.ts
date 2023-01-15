import { registerAs } from "@nestjs/config";

export const uploadConfig = registerAs('upload', () => ({
  uploadDir: process.env.UPLOAD_DIR,
}));
