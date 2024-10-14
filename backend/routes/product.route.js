import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  getMyProducts,
  showProduct,
  getSpecificProducts,
} from "../controllers/product.controller.js";
import { verifyToken, authorize } from "../middlewares/auth.middleware.js";
import upload from "../config/upload.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/specific", getSpecificProducts);

// authenticated routes
router.use(verifyToken);
router.get("/my_products", authorize("seller"), getMyProducts);
router.get("/:id", showProduct);
router.post("/", authorize("seller"), upload.single("image"), createProduct);
router.put("/:id", authorize("seller"), upload.single("image"), updateProduct);
router.delete("/:id", authorize("seller"), deleteProduct);

export default router;
