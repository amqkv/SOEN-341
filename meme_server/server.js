const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const users = require("./routes/api/users");

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// To avoid the CORS block policy 
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// DB config

const port = 5000;


app.post("/login", function(req, res){
    console.log(req.body);
    return res.status(200).json({ msg: "received request" });
});

app.get("/", function(req, res){
    console.log();
    return res.status(200).json({ msg: "received request" });
});

app.listen(port, () => {
    console.log("Server up and running on port " + port + "!");

});