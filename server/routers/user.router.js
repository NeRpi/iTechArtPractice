const { Router } = require("express");
const userController = require("./controllers/user.controller.js");

const router = new Router();

router.post("/", userController.createUser);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
