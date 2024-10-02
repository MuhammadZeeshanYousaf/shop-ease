import express from "express";
import dotenv from "dotenv";
import path from "path";
import logger from "morgan";
dotenv.config();

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";
import verifyToken from "./middlewares/auth.middleware.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(logger("dev"));
app.use(express.json()); // allows us to accept JSON data in the req.body
app.use(express.urlencoded({ extended: true }));
app.use("/api", authRoutes);
app.use(verifyToken);
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
