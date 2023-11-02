const commentModel = require("../models/commentModel");

const addComment = async(req,res)=>{
    const commentData = await commentModel(req.body);
    res.send(commentData);
}

module.exports = { addComment };