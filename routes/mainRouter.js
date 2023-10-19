const express = require("express");
const mainRouter = express.Router();
const userRouter = require("./userRouter");
const blogRouter = require("./blogRouter");

mainRouter.use("/user", userRouter);
mainRouter.use("/blog",blogRouter)

module.exports = mainRouter;