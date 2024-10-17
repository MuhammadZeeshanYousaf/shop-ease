import express from "express";
import { verifyToken, authorize } from "../middlewares/auth.middleware.js";
import { getOrders, createOrder, showOrder, cancelOrder } from "../controllers/order.controller.js";

const router = express.Router();

// authenticated routes
router.use(verifyToken);
router.use(authorize("customer"));

router.get("/", getOrders);
router.post("/", createOrder);
router.get("/:id", showOrder);
router.delete("/:id", cancelOrder);

export default router;
