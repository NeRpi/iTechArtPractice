import { Router } from "express";
import userRouter from "./user.router.ts";
import roleRouter from "./role.router.ts";
import authRouter from "./auth.router.ts";
import gameRouter from "./game.router.js";

const router = Router();

router.use("/user", userRouter);
router.use("/role", roleRouter);
router.use("/auth", authRouter);
router.use("/game", gameRouter);

export default router;
