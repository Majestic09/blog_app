const express = require("express");
const blogUploads = require("../middlewares/blogUploads");
const {
  blogPostValidation,
} = require("../validations/blog/blogDataValidation");
const {
  createBlog,
  blogList,
  searchBlog,
  blogLikes,
  blogDislike,
  editBlog,
  deleteBlog,
  blogDetails,
} = require("../controllers/blogController");
const userAuthentication = require("../middlewares/userAuthentication");
const blogRouter = express.Router();

blogRouter.get("/list", blogList);
blogRouter.post("/like/", blogLikes);
blogRouter.post("/search", searchBlog);
blogRouter.patch("/edit/:id", editBlog);
blogRouter.post("/dislike/", blogDislike);
blogRouter.delete("/delete/:id", deleteBlog);
blogRouter.post("/details/:id/:user",blogDetails)
blogRouter.post(
  "/create",
  blogUploads.single("blogImage"),
  userAuthentication,
  blogPostValidation,
  createBlog
);

module.exports = blogRouter;
