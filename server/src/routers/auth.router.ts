import { Router } from "express";
import authController from "../controllers/auth.controller.js";

const router = Router();

router.post("/registration", authController.registration);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refresh", authController.refresh);

export default router;
