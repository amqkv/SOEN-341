const express = require('express');
const router = express.Router();
const User = require("../../models/User");
require('dotenv/config');

router.get('/search', (req, res) => {

    console.log("Search route");
    //console.log(req.body);

    //const regex = "\/"
    //const searchQuery = regex.concat(req.body,regex);
    //console.log(searchQuery);

    const userArray = User.find( {}, 'username');

    console.log(userArray)


     return res.status(200).json({ userArray });
} )


module.exports = router;
