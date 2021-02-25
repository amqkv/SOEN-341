//authentication following this website's tutorial 
//https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const bodyParser = require("body-parser");

const passport = require("passport");
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");

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



// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
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

app.get("/", function (req, res){
  console.log("home page");
  return res.send("home page");
})

const port = 5000;

app.listen(port, () => console.log("\nServer up and running on port " + port + "!!"));



