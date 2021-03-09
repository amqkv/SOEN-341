const express = require('express');
const router = express.Router();
const User = require("../../models/User");
require('dotenv/config');

//does follow and unfollow
router.post("/follow", (req, res) =>{
    console.log("follow");
    console.log(req.body);

    //Filter: We are looking for the one DOING the following aka the followER
    const followingQuery = {"username": req.body.currentUsername};
    const followingUpdate = {$addToSet: { "following": req.body.usernameOfFollowed }};

    User.updateOne(followingQuery, followingUpdate, {upsert: true}, (err, results) => {
        // console.log(err)
      });

    //Filter: We are looking for the one BEING followed aka the followEE
    const followerQuery = {"username": req.body.usernameOfFollowed};
    const followerUpdate = {$addToSet: { "followers": req.body.currentUsername }};

    User.updateOne(followerQuery, followerUpdate, {upsert: true}, (err, results) => {
        // console.log(err)
      });
    res.send({success: "follow goodie"})
});

module.exports = router;