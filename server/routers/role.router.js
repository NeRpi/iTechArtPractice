import { Router } from "express";
import roleController from "../controllers/role.controller.js";

const router = new Router();

router.post("/", roleController.create);
router.get("/", roleController.getList);
router.get("/:id", roleController.getById);
router.put("/:id", roleController.updateById);
router.delete("/:id", roleController.deleteById);

export default router;
