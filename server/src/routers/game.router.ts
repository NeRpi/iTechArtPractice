import { Router } from "express";
import gameController from "../controllers/game.controller.js";
import jwtMiddleware from "../middleware/jwt.middleware.js";

const router = Router();

router.post("/", jwtMiddleware, gameController.create);
router.get("/:id", jwtMiddleware, gameController.getById);

export default router;
