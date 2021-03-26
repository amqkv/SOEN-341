const express = require('express');
const router = express.Router();
const User = require("../../models/User");
require('dotenv/config');

router.get('/search', (req, res) => {

    console.log("Search route");
    console.log(req.body);

    const regex1 = "\/";
    const regex2 = "\/i";
    const searchQuery = regex1.concat(req.body,regex2);
    console.log(searchQuery);

    const userArray = User.find( { username: searchQuery}, 'username');

    console.log(userArray)


    res.send(userArray);
} )


module.exports = router;
