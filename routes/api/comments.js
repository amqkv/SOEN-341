const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const comment = require("../../models/Comment");
require('dotenv/config');
const FormData = require('form-data');

const validateAddCommentInput = require("../../validation/addComment");


//POST for comments
router.post("/comments", (req, res) => {
    try {
        // Add Comment
        const newComment = new Post({
            postID: req.body.postID,
            commentID: req.body.commentID,
            author: req.body.author,
            content: req.body.content
        });
    
        newComment.save().then(comment => res.json(comment))
    
    } catch(err) {
        // An error occurred when uploading 
        console.log(err)
        return
    }
});


module.exports = router;