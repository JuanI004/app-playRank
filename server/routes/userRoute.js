import express from "express";
import rateLimit from "express-rate-limit";
import authController from "../controllers/authController.js";
import userController from "../controllers/userController.js";

const router = express.Router();

const authLimiter = rateLimit({
  max: 10,
  windowMs: 15 * 60 * 1000,
  message: "Demasiados intentos, por favor intentá de nuevo en 15 minutos",
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/signup", authLimiter, authController.signup);
router.post("/login", authLimiter, authController.login);

router.get("/me", authController.protect, userController.getMe);

export default router;
