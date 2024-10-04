import express from "express";
import dotenv from "dotenv";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(logger("dev"));
app.use(express.json()); // allows us to accept JSON data in the req.body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(
//   cors({
//     // credentials: true,
//     // origin: "*", // process.env.FRONTEND_URL ?? "http://localhost:3000",
//     optionsSuccessStatus: 406,
//   })
// );
app.use("/api", authRoutes);
// Protected routes
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("⚡ Server started at http://localhost:" + PORT);
});
