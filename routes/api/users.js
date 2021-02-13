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

//POST for register
router.post("/register", (req, res) => {

    console.log("register")

    //Form validation
    const{ errors, isValid } = validateRegisterInput(req.body);

    //Check validation
    if(!isValid) {
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
    
    //Login validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User.findOne({ email }).then(user => {
        //Check if the user exists
        if(!user) {
            return res.status(404).json({ emailnotFound: "Incorrect email or password" });
        }
        //Check if correct password
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch) {
                //User matched
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
                return res.status(200).json({ response: "received" });
            }
            else {
                return res.status(400).json({ passwordincorrect: "Incorrect email or password" });
            }
        });
    });
});

module.exports = router;