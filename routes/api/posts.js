const express = require("express");
const pify = require('pify')
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const aws = require('aws-sdk')
const multerS3 = require('multer-s3');
const multer = require('multer');
const Post = require("../../models/Post");
require('dotenv/config');
const FormData = require('form-data');

const validateAddPostInput = require("../../validation/addPost");


//  Connect to S3
const s3 = new aws.S3({ apiVersion: '2006-03-01', 
                        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY });

const upload = multer ({ storage: multerS3({ s3: s3, bucket: process.env.S3_URI }) }); //Fixed

const fetch_10_post_from_db = function(req,res){
    Post.find({}, function (err,posts) {
        if (err){
            res.send('Unable to retrive posts')
            next();
        }
        res.json(posts);
    });
}




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
            S3Link:res['req']['file']['location']
        });
    
        newPost.save().then(post => res.json(post))
    
    } catch(err) {
        // An error occurred when uploading 
        console.log(err)
        return
    }
}));

router.get("/getLatestPost",(async function (req, res) {
    try {

        // Retrieve data from mongo DB
        let post = await Post.findOne().sort({ date: -1 })
        filekey = post['S3Link'].split('.com/')[1]

        // TODO fetch valid user name using user ID
    
        // Fetch image from S3
        const s3_file_params  = { Bucket: process.env.S3_BUCKET, Key:filekey }
        let response = await s3.getObject(s3_file_params).promise();

        // Encode base64
        let buffer = Buffer.from(response["Body"])

        // Build response
        let temp = post["image"].split(".")
        post_data = { "postID":post["_id"],
                      "ownerID":post["ownerID"],
                      "image": { "name":post["image"], "encoding":temp[temp.length -1],"file":buffer.toString("base64")},
                      "description":post["description"],
                      "date":post["date"]
                    }

        // Dump the JSON and file into the response
        res.json(post_data)

    } catch(err) {
        // An error occurred when fetching 
        console.log(err)
        return
    }
}));

router.get("/getFeed",(async function (req, res) {
    try {

        // TODO 
        // fetch list of followed users
        // figure out how many posts to fetch from each
        // sort all fetched posts by date
        // Take the N most recent
        // Fetch N images from S3
        // Return a JSON array payload

    } catch(err) {
        // An error occurred when fetching 
        console.log(err)
        return
    }
}));


module.exports = router;