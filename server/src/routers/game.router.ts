import { Router } from "express";
import gameController from "../controllers/game.controller.js";

const router = Router();

router.use("/:id", gameController.getById);
export default router;