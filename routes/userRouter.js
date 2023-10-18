const express = require("express");
const userRouter = express.Router();
const { createUser } = require("../controllers/userController");

userRouter.post("/create",createUser)

module.exports = userRouter;
