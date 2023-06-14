import { Router } from "express";
import userRouter from "./user.router.js";
import roleRouter from "./role.router.js";
import authRouter from "./auth.router.js";
import jwtMiddleware from "../middleware/jwt.middleware.js";

const router = new Router();

router.use("/user", jwtMiddleware, userRouter);
router.use("/role", roleRouter);
router.use("/auth", authRouter);

export default router;
