import { createRequire } from "node:module";

// Vercel injects env vars into the function. `import "dotenv/config"` is not
// traced into /var/task and crashes the serverless process on startup.
if (!process.env.VERCEL) {
  try {
    createRequire(__filename)("dotenv").config();
  } catch (error) {
    console.warn("Could not load local .env file.", error);
  }
}
