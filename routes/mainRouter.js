const express = require("express");
const mainRouter = express.Router();
const userRouter = require("./userRouter");

mainRouter.use("/user",userRouter)

module.exports = mainRouter;