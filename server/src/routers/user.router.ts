import { Router } from "express";
import userController from "../controllers/user.controller.ts";
import jwtMiddleware from "../middleware/jwt.middleware.ts";
import multer from "multer";

const router = Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/statics");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const upload = multer({ storage: storage });

router.post(
  "/import",
  jwtMiddleware,
  upload.single("users"),
  userController.importUsers
);
router.get("/export", jwtMiddleware, userController.exportUsers);

router.post("/", jwtMiddleware, userController.create);
router.get("/", jwtMiddleware, userController.getList);
router.get("/:id", jwtMiddleware, userController.getById);
router.put("/:id", jwtMiddleware, userController.updateById);
router.delete("/:id", jwtMiddleware, userController.deleteById);
router.get("/by-role/:roleId", jwtMiddleware, userController.getListByRole);

export default router;
