const { unlinkSync } = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports = {
  createUser: async (req, res) => {
    const userData = new userModel(req.body);
    try {
      const isUserExist = await userModel.findOne({
        userEmail: req.body.userEmail,
      });
      if (isUserExist) {
        req.file ? unlinkSync(req.file.path) : null;
        res.status(409).json({
          success: false,
          message: "User is already registered with this email",
        });
      } else {
        const saltRounds = await bcrypt.genSalt(10);
        userData.userPassword = await bcrypt.hash(
          req.body.userPassword,
          saltRounds
        );
        const filePath = `uploads/user/${req.file.filename}`;
        userData.profilePic = filePath;
        const user = await userData.save();
        res.status(201).json({
          success: true,
          message: "User registered sucessfully",
          createdUser: user,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Error occured ${err.message}`,
      });
    }
  },
  userLogin: async (req, res) => {
    const userData = await userModel.findOne({ userEmail: req.body.userEmail });
    try {
      if (userData) {
        const hashPassword = await bcrypt.compare(
          req.body.userPassword,
          userData.userPassword
        );
        if (userData && hashPassword) {
          const token = jwt.sign({ userData }, process.env.SECRET_KEY, {
            expiresIn: "1h",
          });
          res.status(200).json({
            success: true,
            message: "User logged in sucessfully",
            accessToken: token,
          });
        } else {
          res.status(401).json({
            success: false,
            message: "Invalid email or password",
          });
        }
      } else {
        res.status(403).json({
          success: false,
          message: "User are not reconised with email",
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Error occured ${err.message}`,
      });
    }
  },
};
