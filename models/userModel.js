const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  userPhone: {
    type: Number,
    required: true,
  },
  userCity: {
    type: String,
    required: true,
  },
  userState: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    required: true,
    },
    profilePic: {
      type:String
  },
  isActive: {
    type: String,
    default: true,
  },
});
userSchema.set("timestamps", true);

module.exports = mongoose.model("user", userSchema);
