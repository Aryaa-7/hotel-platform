import { Router } from "express";
import type { createHealthController } from "./health.controller.js";

export function healthRoutes(c: ReturnType<typeof createHealthController>) {
  const r = Router();
  r.get("/healthz", c.live);
  r.get("/readyz", c.ready);
  return r;
}