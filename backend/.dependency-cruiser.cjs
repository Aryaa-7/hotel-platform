module.exports = {
  forbidden: [
    {
      name: "no-circular",
      severity: "error",
      from: {},
      to: { circular: true },
    },
    {
      name: "module-only-via-index",
      severity: "error",
      from: { path: "^src/modules/([^/]+)/" },
      to: {
        path: "^src/modules/([^/]+)/",
        pathNot: ["^src/modules/$1/", "^src/modules/[^/]+/index\\.ts$"],
      },
    },
    {
      name: "service-no-framework",
      severity: "error",
      from: { path: "\\.service\\.ts$" },
      to: { path: "node_modules/(express|mongoose)" },
    },
    {
      name: "infra-shared-not-modules",
      severity: "error",
      from: { path: "^src/(infrastructure|shared)/" },
      to: { path: "^src/modules/" },
    },
    {
      name: "no-entry-imports",
      severity: "error",
      from: { path: "^src/modules/", pathNot: "\\.test\\.ts$" },
      to: { path: "^src/(app|server|modules)\\.ts$" },
    },
  ],
  options: {
    tsPreCompilationDeps: true,
    tsConfig: { fileName: "tsconfig.json" },
    doNotFollow: { path: "node_modules" },
  },
};