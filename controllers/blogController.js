const { unlinkSync } = require("fs");
const blogModel = require("../models/blogModel");

module.exports = {

  createBlog: async (req, res) => {
    try {
      const newBlog = new blogModel(req.body);
      newBlog.title = req.body.title
        .trim()
        .replace(/^[a-z]/, (match) => match.toUpperCase());
      console.log(newBlog);
      const existingBlogPost = await blogModel.findOne({
        title: newBlog.title,
      });
      console.log(existingBlogPost);

      if (existingBlogPost) {
        req.file ? unlinkSync(req.file.path) : null;
        res.status(409).json({
          success: false,
          message: "This blog with the title already exists",
        });
      } else {
        const filePath = `/uploads/blog/${req.file.filename}`;
        newBlog.blogImage = filePath;
        const blog = await newBlog.save();
        res.status(201).json({
          success: true,
          message: "Blog created",
          addedBlog: blog,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Error occured ${err.message}`,
      });
    }
  },

  blogList: async (req, res) => {
    try {
      const allBlogsList = await blogModel.find();
      res.status(200).json({
        success: true,
        message: "All blog list",
        blogList: allBlogsList,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Error occured ${err.message}`,
      });
    }
  },

  searchBlog: async (req, res) => {
    const searchData = req.body.title;
    try {
      const searchDatalist = await blogModel.find({ title: searchData });
      res.status(200).json({
        success: true,
        message: "Got all the data by title",
        searchDataList: searchDatalist,
      });
    } catch (err) {
      res.status(500).josn({
        success: false,
        message: `Error occured ${err.message}`,
      });
    }
  },
  
};
