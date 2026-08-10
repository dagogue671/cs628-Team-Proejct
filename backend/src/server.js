import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

const app = express();
const port = Number(process.env.PORT) || 5000;
const mongoUri = process.env.MONGO_URI ?? "mongodb://localhost:27017/social-media";
app.use(cors({ origin: process.env.FRONTEND_URL ?? "http://localhost:8080" }));
app.use(express.json());
app.get("/api/health", (_request, response) => response.json({
  status: "ok",
  message: "Connected to the Express API",
  database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
}));
app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ message: "Internal server error" });
});
app.listen(port, "0.0.0.0", () => console.log(`Express API listening on port ${port}`));
mongoose.connect(mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
