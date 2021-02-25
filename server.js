//authentication following this website's tutorial 
//https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Post = require('./models/Post');
require('dotenv/config');


const passport = require("passport");

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true , useUnifiedTopology: true}
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

//Routes
app.use("/api/users", users);
app.use("/api/posts", posts);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("\nServer up and running on port " + port + "!!"));



