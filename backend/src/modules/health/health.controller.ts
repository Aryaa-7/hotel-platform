import type { RequestHandler } from "express";
import type { createHealthService } from "./health.service.js";

export function createHealthController(svc: ReturnType<typeof createHealthService>) {
  const live: RequestHandler = (_req, res) => { res.json(svc.live()); };
  const ready: RequestHandler = async (_req, res) => {
    const r = await svc.ready();
    res.status(r.ok ? 200 : 503).json(r);
  };
  return { live, ready };
}