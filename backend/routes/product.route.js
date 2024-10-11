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
router.use(verifyToken);
router.get("/my_products", authorize("seller"), getMyProducts);
router.post("/", upload.single("image"), createProduct);
router.get("/:id", showProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
