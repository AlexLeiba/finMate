import { build } from "esbuild";

// Vercel's function tracer currently omits node_modules from the Express
// service, so /var/task/app.js crashes on require("express"). Ship one file
// that already contains the runtime dependencies.
await build({
  entryPoints: ["src/app.ts"],
  outfile: "dist/app.js",
  bundle: true,
  platform: "node",
  target: "node22",
  format: "cjs",
  sourcemap: true,
  logLevel: "info",
});
