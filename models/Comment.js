const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema of user
const CommentSchema = new Schema({
    postID: {
        type: String,
        required: true
    },
    commentID: {
        type: Number,
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

module.exports = mongoose.model("comments", CommentSchema);