import { registerAs } from "@nestjs/config";

export const uploadConfig = registerAs('uploadUser', () => ({
  uploadDir: process.env.USER_UPLOAD_DIR,
}));
