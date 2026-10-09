import { defineConfig } from "vitest/config";
export default defineConfig({ test: { env: { NODE_ENV: "test", MONGO_URI: "mongodb://x", LOG_LEVEL: "silent" } } });