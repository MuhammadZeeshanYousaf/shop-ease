import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  getMyProducts,
} from "../controllers/product.controller.js";
import { verifyToken, authorize } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.get("/", getProducts);
router.use(verifyToken);
router.get("/my_products", authorize("seller"), getMyProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
