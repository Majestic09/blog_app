const { unlinkSync } = require("fs");
const blogModel = require("../models/blogModel");

module.exports = {
  createBlog: async (req, res) => {
    try {
      const newBlog = new blogModel(req.body);
      newBlog.title = req.body.title
        .trim()
        .replace(/^[a-z]/, (match) => match.toUpperCase());
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
      res.status(500).json({
        success: false,
        message: `Error occured ${err.message}`,
      });
    }
  },

  blogLikes: async (req, res) => {
    const userId = req.body.userId;
    const blogId = req.body.blogId;
    try {
      const checkUser = await blogModel.findById(blogId);
      if (checkUser.likes.includes(userId)) {
        //dislike logic
        const blogData = await blogModel.findOneAndUpdate(
          { _id: blogId },
          { $push: { dislikes: userId } },
          { new: true }
        );
        const totalLikes = await blogData.dislikes.length;
        const likedUser = await blogModel.findOne({ blogId: blogData._id });
        if (likedUser) {
          return res.status(404).json({
            success: false,
            message: "Blog not found",
          });
        } else {
          res.status(200).json({
            success: true,
            likedUserId: userId,
            likesCount: totalLikes,
            message: "Dislike added successfully",
          });
        }
        res.status(409).json({
          success: false,
          message: "Already disliked by the user",
        });
      } else {
        const blogData = await blogModel.findOneAndUpdate(
          { _id: blogId },
          { $push: { likes: userId } },
          { new: true }
        );
        const totalLikes = await blogData.likes.length;
        const likedUser = await blogModel.findOne({ blogId: blogData._id });
        if (likedUser) {
          return res.status(404).json({
            success: false,
            message: "Blog not found",
          });
        } else {
          res.status(200).json({
            success: true,
            likedUserId: userId,
            likesCount: totalLikes,
            message: "Like added successfully",
          });
        }
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Error occured ${err.message}`,
      });
    }
  },
};
