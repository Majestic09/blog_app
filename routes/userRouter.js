const express = require("express");
const userRouter = express.Router();
const { createUser, userLogin } = require("../controllers/userController");

userRouter.post("/login", userLogin)
userRouter.post("/create",createUser)

module.exports = userRouter;
