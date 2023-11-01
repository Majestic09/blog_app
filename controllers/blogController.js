const { unlinkSync } = require("fs");
const blogModel = require("../models/blogModel");

module.exports = {
  createBlog: async (req, res) => {
    try {
      const newBlog = new blogModel(req.body);
      // newBlog.title =
      //   req.body.title.trim().charAt(0).toUpperCase() +
      //   newBlog.title.slice(1).join("");
      // .replace(/^[a-z]/, (match) => match.toUpperCase());
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
      const blog = await blogModel.findById(blogId);
  
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found",
        });
      }
  
      if (blog.likes.includes(userId)) {
        return res.status(409).json({
          success: false,
          message: "Already liked by the user",
        });
      }
  
      if (blog.dislikes.includes(userId)) {
        blog.dislikes.pull(userId);
      }
  
      // Add the user's ID to the 'likes' array
      blog.likes.push(userId);
      const updatedBlog = await blog.save();
      const totalLikes = updatedBlog.likes.length;
  
      res.status(200).json({
        success: true,
        likedUserId: userId,
        likesCount: totalLikes,
        message: "Like added successfully",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Error occurred: ${err.message}`,
      });
    }
  },
  

  blogDislike: async (req, res) => {
    const userId = req.body.userId;
    const blogId = req.body.blogId;
  
    try {
      const blog = await blogModel.findById(blogId);
  
      // Checking if the blog exists
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found",
        });
      }
  
      // Checking if the user has already disliked the blog
      if (blog.dislikes.includes(userId)) {
        return res.status(409).json({
          success: false,
          message: "Already disliked by the user",
        });
      }
  
      // Removing the userId from the likes array if they had previously liked the blog
      if (blog.likes.includes(userId)) {
        blog.likes = blog.likes.filter((id) => id.toString() !== userId);
      }
  
      // Adding the userId to the dislikes array
      blog.dislikes.push(userId);
  
      const updatedBlog = await blog.save();
      const dislikeCount = updatedBlog.dislikes.length;
  
      res.status(200).json({
        success: true,
        dislikesCount: dislikeCount,
        message: "Dislike added successfully",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Error occurred: ${err.message}`,
      });
    }
  },
  
};
