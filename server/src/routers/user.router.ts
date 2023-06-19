import { Router } from "express";
import userController from "../controllers/user.controller.js";
import jwtMiddleware from "../middleware/jwt.middleware.js";

const router = Router();

router.post("/", jwtMiddleware, userController.create);
router.get("/", jwtMiddleware, userController.getList);
router.get("/:id", jwtMiddleware, userController.getById);
router.put("/:id", jwtMiddleware, userController.updateById);
router.delete("/:id", jwtMiddleware, userController.deleteById);
router.get("/by-role/:roleId", jwtMiddleware, userController.getListByRole);

export default router;
