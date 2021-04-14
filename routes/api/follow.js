const express = require('express');
const router = express.Router();
const User = require("../../models/User");
require('dotenv/config');

//does follow
router.post("/follow", (req, res) =>{
    console.log("follow");
    console.log(req.body);

    //Filter: We are looking for the one DOING the following aka the followER
    const followingQuery = {"username": req.body.currentUsername};
    const followingUpdate = {$addToSet: { "following": req.body.visitedUsername }};

    User.updateOne(followingQuery, followingUpdate, {upsert: true}, (err, results) => {
        // console.log(err)
      });

    //Filter: We are looking for the one BEING followed aka the followEE
    const followerQuery = {"username": req.body.visitedUsername};
    const followerUpdate = {$addToSet: { "followers": req.body.currentUsername }};

    User.updateOne(followerQuery, followerUpdate, {upsert: true}, (err, results) => {
        // console.log(err)
      });
    res.send({success: "follow goodie"})
});

//does unfollow
router.post("/unfollow", (req, res) =>{
    console.log("unfollow");
    console.log(req.body);

    //Filter: We are looking for the one WHO DID the following aka the followER
    const unfollowingQuery = {"username": req.body.currentUsername};
    const unfollowingUpdate = {$pull: { "following": req.body.visitedUsername }};

    User.updateOne(unfollowingQuery, unfollowingUpdate, {upsert: true}, (err, results) => {
        // console.log(err)
    });

    //Filter: We are looking for the one WHO WAS followed aka the followEE
    const unfollowerQuery = {"username": req.body.visitedUsername};
    const unfollowerUpdate = {$pull: { "followers": req.body.currentUsername }};

    User.updateOne(unfollowerQuery, unfollowerUpdate, {upsert: true}, (err, results) => {
        // console.log(err)
    });
    res.send({success: "unfollow goodie"})
});

//check if follow
router.post("/checkfollow", (req, res)=>{
    console.log("check");
    const userVisited = {"username": req.body.visitedUsername};

    //Fetches the arrays/list
    User.findOne(userVisited).then(userInfo => {
        const followersList = userInfo.followers;
        const followingList = userInfo.following;
        res.send({followersList: followersList, followingList: followingList})
    });
});

module.exports = router;
