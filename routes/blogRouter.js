const express = require("express");
const blogRouter = express.Router();

blogRouter.get("/create");

module.exports = blogRouter;
