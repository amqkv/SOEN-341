const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    user_uid: {
        type: String,
        required: true
    },
    pic_s3_uid: String,
    pic_name: {
        type: String,
        required: true
    },
    pic_extension: {
        type: String,
        required: true
    },
    title: String,
    caption: String
}, {timestamps : true});

module.exports = mongoose.model('Post',PostSchema);