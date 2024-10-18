import express from "express";
import { verifyToken, authorize } from "../middlewares/auth.middleware.js";
import { getOrders, createOrder, showOrder, cancelOrder, getSellerOrders, updateOrderStatus } from "../controllers/order.controller.js";

const router = express.Router();

// authenticated routes
router.use(verifyToken);
router.use(authorize(["customer", "seller"]));

router.get("/seller", authorize("seller"), getSellerOrders)
router.patch("/:id/status", authorize("seller"), updateOrderStatus)
router.get("/", getOrders);
router.post("/", createOrder);
router.get("/:id", showOrder);
router.delete("/:id", cancelOrder);

export default router;
