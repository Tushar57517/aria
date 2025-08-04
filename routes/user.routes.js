import express from "express";
import { login, logout, register } from "../controllers/user.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", verifyToken, logout);

export default router;
