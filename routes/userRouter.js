const express = require("express");
const userRouter = express.Router();
const uploads = require("../middlewares/userUploads");
const {
  createUser,
  userLogin,
  resetUserPassword,
  resetPassword
} = require("../controllers/userController");
const { registerUserValidation, loginUserValidation } = require("../validations/user/userDataval");


userRouter.post("/login",loginUserValidation, userLogin);
userRouter.post("/resetpassword", resetUserPassword);
userRouter.post("/reset/:id/:token", resetPassword);
userRouter.post("/create", uploads.single("profilePic"),registerUserValidation, createUser);

module.exports = userRouter;
