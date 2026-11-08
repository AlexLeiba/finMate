import "./config/loadEnv";
import app = require("./app");
import { connectDB } from "./config/mongoDBConnection";

const PORT = process.env.PORT || 8000;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
}

startServer().catch(console.error);