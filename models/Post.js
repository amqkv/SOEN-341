const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema of user
const PostSchema = new Schema({
    ownerID: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    S3Link: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    comments:{
        type: Array,
        default: []
    }
});

module.exports = Post = mongoose.model("posts", PostSchema);
