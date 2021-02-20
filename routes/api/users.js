const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//Load input validation for register and login
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load User model
const User = require("../../models/User");
const { Session } = require("express-session");

//POST for register
router.post("/register", (req, res) => {

    console.log("register")
    console.log(req.body);
    //Form validation
    const{ errors, isValid } = validateRegisterInput(req.body);

    //Check validation
    if(!isValid) {
        console.log("not valid")
        return res.status(400).json(errors);
    }

    //Check if user already exists
    User.findOne({ email: req.body.email }).then(user => {
        if(user) {
            return res.status(400).json({email:"Email already used"});
        }
        //If not existing then create new user
        else {
            const newUser = new User({
                username: req.body.username,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            //Hash password to save in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });              
        }
    });
});



//POST for login
router.post("/login", (req,res) => {

    console.log("login");
    console.log(req.body);
    // Form validation
    const{ errors, isValid } = validateLoginInput(req.body);

    //Login validation
    if(!isValid) {
        console.log("not valid")
        console.log(errors)
        return res.status(401).json({message: "Invalid login credentials"});
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User.findOne({ email }).then(user => {
        //Check if the user exists
        if(!user) {
            console.log("user doesn't exist")
            return res.send({ error: "User doesn't exist" });
        }
        console.log("user: " + user);
        //Check if correct password
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch) {
                //User matched
                req.session.user = user;
                console.log("req session user: " + req.session.user);
                req.session.save();
                //JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };

                //Sign with token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
                console.log("login gucci")
                return res.status(200).json({ user });
            }
            else {
                console.log("login not gucci")
                return res.send({ error: "Incorrect email/password combination" });
            }
        });
    });
});

// GET for login
router.get("/login", (req,res) =>{
    console.log("login get")
    console.log(req.session.user)
    if(req.session.user){
        console.log("get req.session.user: " + req.session.user)
        res.send({ loggedIn: true, user: req.session.user })
    } else {
        res.send({ loggedIn: false })
    }
});

module.exports = router;