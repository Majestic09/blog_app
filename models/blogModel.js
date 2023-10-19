const mongoose = require("mongoose");
const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  isActive: {
    type: String,
    default: true,
  },
});
blogSchema.set("timestamps", true);

module.exports = mongoose.model("blog", blogSchema);
