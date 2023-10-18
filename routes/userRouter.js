const express = require("express");
const userRouter = express.Router();
const { createUser } = require("../controllers/userController");

userRouter.get("/create",createUser)

module.exports = userRouter;
