const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema of user
const CommentSchema = new Schema({
    postID: {
        type: String,
        required: true
    },
    commentID: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = Post = mongoose.model("comments", CommentSchema);