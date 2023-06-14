import { Router } from "express";
import userRouter from "./user.router.js";
import roleRouter from "./role.router.js";
import authRouter from "./auth.router.js";

const router = new Router();

router.use("/user", userRouter);
router.use("/role", roleRouter);
router.use("/auth", authRouter);

export default router;
