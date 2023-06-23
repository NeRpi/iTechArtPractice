import { Router } from "express";
import userRouter from "./user.router.ts";
import roleRouter from "./role.router.ts";
import authRouter from "./auth.router.ts";

const router = Router();

router.use("/user", userRouter);
router.use("/role", roleRouter);
router.use("/auth", authRouter);

export default router;
