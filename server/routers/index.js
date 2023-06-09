const { Router } = require("express");
const userRouter = require("./user.router.js");

const router = new Router();

router.use("/user", userRouter);

module.exports = router;
