
export function createHealthService(deps: { pingDb: () => Promise<boolean> }) {
  return {
    live: () => ({ status: "ok" as const }),
    async ready() {
      const db = await deps.pingDb();
      return { ok: db, checks: { db: db ? "up" : "down" } };
    },
  };
}