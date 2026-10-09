import { createApp } from "./app.js";
import { buildModules } from "./modules.js";
import { env } from "./config/env.js";
import { logger } from "./infrastructure/logger/logger.js";
import { connectMongo, closeMongo } from "./infrastructure/db/mongo.js";
import { paginationQuerySchema } from "@hotel/contracts";
console.log(paginationQuerySchema.parse({}));

await connectMongo();
const server = createApp(buildModules()).listen(env.PORT, () => logger.info(`listening on ${env.PORT}`));

function shutdown(signal: string) {
  logger.info({ signal }, "shutting down");
  const force = setTimeout(() => process.exit(1), 10_000);
  force.unref();
  server.close(async () => { await closeMongo(); process.exit(0); });
}
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));