import { createHealthService } from "./health.service.js";
import { createHealthController } from "./health.controller.js";
import { healthRoutes } from "./health.routes.js";

export function createHealthModule(deps: { pingDb: () => Promise<boolean> }) {
  return { router: healthRoutes(createHealthController(createHealthService(deps))) };
}