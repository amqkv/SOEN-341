//authentication following this website's tutorial 
//https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const bodyParser = require("body-parser");
const Post = require('./models/Post');
require('dotenv/config');

const passport = require("passport");
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const follow = require("./routes/api/follow");
const comments = require("./routes/api/comments");

const app = express();

// Cors to allow cross-origin requests
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}));

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: true
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
app.use("/api/follow", follow);

app.use("/api/comments", comments); 

app.get("/", function (req, res){
  console.log("home page");
  return res.send("home page");
})

const port = 5000;

app.listen(port, () => console.log("\nServer up and running on port " + port + "!!"));



