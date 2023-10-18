const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

module.exports = {
  createUser: async (req, res) => {
    const userData = new userModel(req.body);
    try {
      const isUserExist = await userModel.findOne({
        userEmail: req.body.userEmail,
      });
      if (isUserExist) {
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
        console.log(userData.userPassword);
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
};
