import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
  host: process.env.NOTIFY_MONGO_HOST,
  port: process.env.NOTIFY_MONGO_PORT,
  dbName: process.env.NOTIFY_MONGO_DB,
  user: process.env.NOTIFY_MONGO_USER,
  password: process.env.NOTIFY_MONGO_PASSWORD,
  authBase: process.env.NOTIFY_MONGO_AUTH_BASE
})
)
