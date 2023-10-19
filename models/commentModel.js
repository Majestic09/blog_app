const mongoose = require("mongoose");
const commentSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    blogID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
      required: true,
    },
    isActive: {
      type: String,
      default: true,
    },
  },
  { versionKey: false }
);
commentSchema.set("timestamps", true);

module.exports = mongoose.model("comment", commentSchema);
