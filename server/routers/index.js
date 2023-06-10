import { Router } from "express";
import userRouter from "./user.router.js";
import roleRouter from "./role.router.js";

const router = new Router();

router.use("/user", userRouter);
router.use("/role", roleRouter);

export default router;
