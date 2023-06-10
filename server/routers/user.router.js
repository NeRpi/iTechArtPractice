const { Router } = require("express");
const userController = require("../controllers/user.controller");

const router = new Router();

router.post("/", userController.create);
router.get("/", userController.getList);
router.get("/:id", userController.getById);
router.put("/:id", userController.updateById);
router.delete("/:id", userController.deleteById);

module.exports = router;
