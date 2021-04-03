const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require('dotenv/config');

//Load User model
const User = require("../../models/User");

// POST fot changing email
router.post("/editEmail", (req, res) => {
    User.find({$or: [{ "username": req.body.username }, {"email": req.body.newEmail}]}).then(user => {
        if(user.length > 1){
            res.send({error: "Email already in use"})
        }
        else{
            bcrypt.compare(req.body.password, user[0].password).then(isMatch => {
                if(isMatch){
                    if(user[0].email === req.body.newEmail){
                        res.send({ error: "Bruh this is already your current email."})
                    }
                    else{
                        User.updateOne({ "username" : req.body.username }, { email: req.body.newEmail }, { upsert: true }, (err, results) => {
                            if(err){
                                // console.log(err);
                                res.send({ error: "An error occured, please try again later." })
                            }
                            else
                                res.send({ success: "Email successfully changed" })
                        })
                    }
                }
                else{
                    res.send({ error: "Password is incorrect" });
                }
            })
        }
    })
});


// POST for changing username
router.post("/editUsername", (req, res) => {
    console.log("edit username");
    console.log(req.body.username);
    console.log(req.body.newUsername);
    console.log(req.body.password);

    User.find({$or: [{"username": req.body.username}, {"username": req.body.newUsername}]}).then(user => {
        console.log(user)
        if(user.length > 1){
            res.send({error: "That username is already taken."})
        }
        else{
            bcrypt.compare(req.body.password, user[0].password).then(isMatch => {
                if(isMatch){
                    User.updateOne({"username" : req.body.username}, {"username": req.body.newUsername}, {upsert: true}, (err, results) => {
                        if(err){
                            res.send({error: "An error occured, please try again later."});
                        }
                        else
                            res.send({ success: "Username successfully changed" })
                    })
                }
                else{
                    res.send({ error: "Password is incorrect" });
                }
            })
        }
    })
});

// POST for changing password
router.post("/editPassword", (req, res) => {
    console.log("edit password")
    console.log(req.body.username);
    console.log(req.body.oldPassword);
    console.log(req.body.newPassword);

    User.findOne({"username": req.body.username}).then(user => {
        console.log(user);
        // Checking if old password and new password are the same
        bcrypt.compare(req.body.newPassword, user.password).then(isMatch => {
            if(isMatch){
                res.send({error: "New password cannot be old password"});
            }
            // Checking if the entered password is correct to change
            else{
                bcrypt.compare(req.body.oldPassword, user.password).then(isMatch => {
                    if(isMatch){
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(req.body.newPassword, salt, (err, hashedPassword) => {
                                if(err) throw err;
                                User.updateOne({ "username": req.body.username }, { "password": hashedPassword }, {upsert: true}, (error, results) => {
                                     if(err) 
                                        console.log(err);
                                     else
                                        res.send({ success: "Password successfully changed" })
                                })
                            })
                        })
                    }
                    else{
                        res.send({error: "Password is incorrect"})
                    }
                })
            }
        })

    })

})


module.exports = router;
