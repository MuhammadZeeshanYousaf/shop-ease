import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/auth.controller.js";

// Create a router instance
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/refresh", refreshAccessToken);
router.delete("/logout", logoutUser);

export default router;
