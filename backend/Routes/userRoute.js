import express from "express";
import { loginUser, registerUser, getUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/Auth.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/get", authMiddleware, getUser);

export default router;
