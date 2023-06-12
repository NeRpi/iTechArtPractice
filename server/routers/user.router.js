import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = new Router();

router.post("/", userController.create);
router.get("/", userController.getList);
router.get("/:id", userController.getById);
router.put("/:id", userController.updateById);
router.delete("/:id", userController.deleteById);
router.get("/by-role/:roleId", userController.getListByRole);

export default router;
