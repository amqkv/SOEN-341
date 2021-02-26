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

const validateAddPostInput = require("../../validation/addPost");


//  Connect to S3
const s3 = new aws.S3({ apiVersion: '2006-03-01' });

const upload = multer ({
    storage: multerS3({
        s3: s3,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        bucket: 'soen-341-test-bucket-0'
    })
});


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



module.exports = router;