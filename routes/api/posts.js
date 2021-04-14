const express = require("express");
const pify = require('pify')
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const aws = require('aws-sdk')
const multerS3 = require('multer-s3');
const multer = require('multer');
const Post = require("../../models/Post");
const User = require("../../models/User");
const Comment = require("../../models/Comment");

require('dotenv/config');

const max_posts_in_feed = 10
const FormData = require('form-data');
const validateAddPostInput = require("../../validation/addPost");
// const { default: Comments } = require("../../client/src/Components/Templates/Post/Comments");


//  Connect to S3
const s3 = new aws.S3({ apiVersion: '2006-03-01', 
                        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY });

const upload = multer ({ storage: multerS3({ s3: s3, bucket: process.env.S3_BUCKET }) }); //Fixed


//Post for addPost
router.post("/addPost", (async function (req, res) {
    try {
        // TODO validation must be done in the front end
        
        // Await S3 uploading of the file
        await pify(upload.single('file'))(req, res)

        // Add Post
        const newPost = new Post({
            ownerID: req.body.ownerID,
            image: req.body.image,
            description: req.body.description,
            S3Link:res['req']['file']['location'],
            username:req.body.username
        });
    
        newPost.save().then(post => res.json(post))
    
    } catch(err) {
        // An error occurred when uploading 
        console.log(err)
        return
    }
}));

const fetch_posts_data = async function(array_of_posts){
    
    let s3_file_params = {};
    let response = null;
    let buffer = null;
    let temp = null;
    let post_data = [];
    let comments = [];
    let date = "";

    let i = 0;
    for(i = 0; i < array_of_posts.length; i++){

        let post = array_of_posts[i];
        
        // Retrieve data from mongo DB
        filekey = (post.S3Link).split('.com/')[1]

        // Fetch image from S3
        s3_file_params = { Bucket: process.env.S3_BUCKET, Key:filekey }
        response = await s3.getObject(s3_file_params).promise();

        // Encode base64
        buffer = Buffer.from(response["Body"]);

        // Build response
        temp = post["image"].split(".");

        // Fetch comments from database
        comments = await Comment.find({postID: post._id}).sort({ date: -1 });
        // console.log(post["date"].toString().substring(0, post["date"].toString().indexOf("GMT") - 10))
        date = post["date"].toString().substring(0, post["date"].toString().indexOf("GMT") - 10)
        post_data.push({
            "postID": post["_id"],
            "ownerID":post["ownerID"],
            "image": { "name":post["image"], "encoding":temp[temp.length -1],"file":buffer.toString("base64")},
            "description":post["description"],
            "date": date,
            "comments": comments,
            "username": post["username"]
        })
    }

    return post_data
}

router.get("/getFeed",(async function (req, res) {
    try {

        // Get user data
        var user_data = await User.find({ '_id': req.query.userID });

        // Perpare following list date limit
        var now = new Date(req.query.forwardDateLimit)
        var two_days_ago = new Date(now.setDate(now.getDate()-2));

        // Fetch posts of followers within the last 2 days
        var relevant_posts = await Post.find({'username': { $in: user_data[0].following }, 'date':{ $lte: two_days_ago}}).sort({ date: -1 }).limit(max_posts_in_feed);

        // If the amount of posts smaller than limit, fetch random feeds to compensate
        if ( relevant_posts.length < 10 ){

            var random_recent_posts = []
            var selected_post_ids = []
            let i = 0

            for (i = 0; i < relevant_posts.length; i++){
                selected_post_ids.push(relevant_posts[i]['_id'])
            }
            
            random_recent_posts = await Post.find({'_id': { $nin: selected_post_ids }}).sort({ date: -1 }).limit(max_posts_in_feed - relevant_posts.length);
            relevant_posts = relevant_posts.concat(random_recent_posts);

        }
        var posts_data = await fetch_posts_data(relevant_posts)
        res.json(posts_data)

    } catch(err) {
        // An error occurred when fetching 
        console.log(err)
        return
    }
}));

router.get("/getOlderFeed",(async function (req, res) {
    try {
    
        // Get user data
        var user_data = await User.find({ '_id': req.query.userID });

        // Perpare following list date limit
        var now = new Date(req.query.forwardDateLimit)
        var two_days_ago = new Date(now.setDate(now.getDate()-2));

        // Fetch posts of followers within the last 2 days
        var relevant_posts = await Post.find({'username': { $in: user_data[0].following }, 'date':{ $lte: two_days_ago}}).sort({ date: -1 }).limit(max_posts_in_feed);

        // If the amount of posts smaller than limit, fetch random feeds to compensate
        if ( relevant_posts.length < 10 ){

            var random_recent_posts = []
            var selected_post_ids = []
            let i = 0

            for (i = 0; i < relevant_posts.length; i++){
                selected_post_ids.push(relevant_posts[i]['_id'])
            }
            
            random_recent_posts = await Post.find({'_id': { $nin: selected_post_ids }, 'date':{ $lte: two_days_ago}}).sort({ date: -1 }).limit(max_posts_in_feed - relevant_posts.length);
            relevant_posts = relevant_posts.concat(random_recent_posts);

        }
        console.log("!!!!!")
        console.log(relevant_posts.length)
        var posts_data = await fetch_posts_data(relevant_posts)
        res.json(posts_data)

    } catch(err) {
        // An error occurred when fetching 
        console.log(err)
        return
    }
}));


module.exports = router;