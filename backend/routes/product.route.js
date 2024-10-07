import express from "express";

import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = express.Router();

// router.use(verifyToken);
router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
