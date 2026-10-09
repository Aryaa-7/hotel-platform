import type { Router } from "express";
import { pingMongo } from "./infrastructure/db/mongo.js";
import { createHealthModule } from "./modules/health/index.js";

export function buildModules() {
  const health = createHealthModule({ pingDb: pingMongo });
  return {
    root: [health.router] as Router[],   // unversioned routes
    v1: [] as Router[],                  // /api/v1/* modules get added here each phase
  };
}