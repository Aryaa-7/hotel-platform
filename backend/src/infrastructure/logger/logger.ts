import pino from "pino";
import { env } from "../../config/env.js";

export const logger = pino({
  level: env.LOG_LEVEL,
  redact: {
    paths: ["req.headers.authorization", "req.headers.cookie", "*.phone", "*.otp", "*.token", "*.password"],
    censor: "[redacted]",
  },
  ...(env.NODE_ENV === "development" && { transport: { target: "pino-pretty" } }),
});