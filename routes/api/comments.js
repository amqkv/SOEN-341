const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const comment = require("../../models/Comment");
require('dotenv/config');
const FormData = require('form-data');

const validateAddCommentInput = require("../../validation/addComment");
const Comment = require("../../models/Comment");

//POST for comments
router.post("/comments", (req, res) => {
    try {
        console.log(req.body)
        let newCommentID;
        Comment.find({}).sort({_id: -1}).limit(1).exec(function(err, comment){
            if(comment.length === 0){
                newCommentID = 0;
            }
            else{
                newCommentID = comment[0].commentID + 1;
            }
            console.log(comment)
            
            // Setting the ID for the new comment

            // Add Comment
            const newComment = new Post({
                postID: req.body.postID,
                commentID: newCommentID,
                author: req.body.author,
                content: req.body.content
            });

            newComment.save();
            res.send({success: "added comment"});
        })


    } catch(err) {
        // An error occurred when uploading 
        console.log(err)
        return
    }
});


module.exports = router;