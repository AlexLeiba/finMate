import "./config/loadEnv";
import { connectDB } from "./config/mongoDBConnection";
import app from "./app";
const PORT = process.env.PORT || 8000;

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    console.log(process.env.PORT ? ".env file loaded" : "default (8000)");
    console.log("Environment:", process.env.NODE_ENV);
  });
}

void startServer().catch((error: unknown) => {
  console.error("Failed to start backend:", error);
  process.exitCode = 1;
});
