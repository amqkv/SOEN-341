//authentication following this website's tutorial 
//https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669

const express = require("express");
const mongoose = require("mongoose");
const multer = require('multer');
const bodyParser = require("body-parser");
const Post = require('./models/Post');
require('dotenv/config');

const passport = require("passport");

const users = require("./routes/api/users");
const cors = require('cors');

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

//  Connect to S3
const s3 = new aws.S3({ apiVersion: '2006-03-01' });

const upload = multer ({
    storage: multerS3({
        s3: s3,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        bucket: 'soen-341-test-bucket-0',
        metadata:(req,file,cb) => {
            cb(null, { fieldname: file.fieldname });
        }
    })
});


// Allowing CORS
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors());


//Passport Middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);



//Routes
app.use("/api/users", users);
app.get("/", function (req, res){
  console.log("home page");
  return res.send("home page");
})

app.post('/upload', upload.single('post_picture'), (req,res) => {
  console.log(req.body)
  return res.json({status: 'OK '})
});

// app.post("/login", function(req, res){
//   console.log("login in server");
//   return res.status(200).json({ response: "received login in server.js" });
// })


const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

app.listen(port, () => console.log("\nServer up and running on port " + port + "!!"));



