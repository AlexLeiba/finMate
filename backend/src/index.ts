import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/mongoDBConnection";
import app from "./app";
const PORT = process.env.PORT || 8000;

await connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  console.log(process.env.PORT ? ".env file loaded" : "default (8000)");
  console.log("Environment:", process.env.NODE_ENV);
});
