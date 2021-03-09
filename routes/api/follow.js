const express = require('express');
const router = express.Router();
const User = require("../../models/User");

require('dotenv/config');

//does follow and unfollow
router.post("/follow", (req, res) =>{
    console.log("follow");
    console.log(req.body);

    //Filter: We are looking for the one DOING the following aka the followER
    const followingQuery = {"username": req.body.usernameOfFollower};
    const followingUpdate = {
        $addToSet: { "following": req.body.usernameOfFollowing }
    };

    User.updateOne(followingQuery, followingUpdate);

    //Filter: We are looking for the one BEING followed aka the followEE
    const followerQuery = {"username": req.body.usernameOfFollowing};
    const followerUpdate = {
        $addToSet: { "following": req.body.usernameOfFollowerr }
    };
    User.updateOne(followerQuery, followerUpdate);

});