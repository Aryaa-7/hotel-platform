import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../../app.js";
import { createHealthModule } from "./index.js";

const appWith = (up: boolean) =>
  createApp({ root: [createHealthModule({ pingDb: async () => up }).router], v1: [] });

describe("health", () => {
  it("liveness is 200", async () => { expect((await request(appWith(true)).get("/healthz")).status).toBe(200); });
  it("readiness is 503 when db is down", async () => { expect((await request(appWith(false)).get("/readyz")).status).toBe(503); });
  it("unknown route returns the standard error shape", async () => {
    const res = await request(appWith(true)).get("/nope");
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe("NOT_FOUND");
    expect(res.body.error.requestId).toBeTruthy();
  });
});