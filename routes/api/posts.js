const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const Post = require("../../models/Post");

//Post for addPost
router.post("/addPost", (req, res) => {

    // Has Issues
    // //Form validation
    // const { errors, isValid } = validateAddPostInput(req.body);

    // //Check validation
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

    //Add Post
    const newPost = new Post({
        ownerID: req.body.ownerID,
        image: req.body.image,
        description: req.body.description
    });
    
    // newPost
    //     .save()
    //     .then(post => res.json(post))

});



module.exports = router;