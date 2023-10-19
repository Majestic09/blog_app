const express = require("express");
const userRouter = express.Router();
const uploads = require("../middlewares/userUploads");
const { createUser, userLogin } = require("../controllers/userController");

userRouter.post("/login", userLogin)
userRouter.post("/create",uploads.single("profilePic"),createUser)

module.exports = userRouter;
