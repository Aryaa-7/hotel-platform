import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { pinoHttp } from "pino-http";
import { randomUUID } from "node:crypto";
import { env } from "./config/env.js";
import { logger } from "./infrastructure/logger/logger.js";
import { errorHandler, notFound } from "./infrastructure/http/error-handler.js";
import type { buildModules } from "./modules.js";

export function createApp(modules: ReturnType<typeof buildModules>) {
  const app = express();
  app.disable("x-powered-by");
  app.set("trust proxy", 1);

  app.use(pinoHttp({
    logger,
    genReqId: (req, res) => {
      const id = (req.headers["x-request-id"] as string) ?? randomUUID();
      res.setHeader("x-request-id", id);
      return id;
    },
  }));
  app.use(helmet());
  app.use(cors({ origin: env.corsOrigins }));
  app.use(express.json({ limit: "100kb" }));
  app.use(rateLimit({ windowMs: 60_000, limit: 300, standardHeaders: true, legacyHeaders: false }));

  modules.root.forEach((r) => app.use(r));
  const v1 = express.Router();
  modules.v1.forEach((r) => v1.use(r));
  app.use("/api/v1", v1);

  app.use(notFound);
  app.use(errorHandler);
  return app;
}