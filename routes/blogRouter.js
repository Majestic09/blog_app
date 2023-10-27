const express = require("express");
const companyUploads = require("../middlewares/blogUploads");
const { createBlog, blogList, searchBlog } = require("../controllers/blogController");
const blogRouter = express.Router();

blogRouter.post("/create",companyUploads.single("blogImage"),createBlog);
blogRouter.get("/list", blogList);
blogRouter.post("/search",searchBlog)

module.exports = blogRouter;
