const express = require("express");
const companyUploads = require("../middlewares/blogUploads");
const { blogPostValidation } = require("../validations/blog/blogDataValidation");
const { createBlog, blogList, searchBlog,blogLikes } = require("../controllers/blogController");
const blogRouter = express.Router();

blogRouter.get("/list", blogList);
blogRouter.post("/search", searchBlog)
blogRouter.post("/like/",blogLikes)
blogRouter.post("/create",companyUploads.single("blogImage"),blogPostValidation,createBlog);

module.exports = blogRouter;
