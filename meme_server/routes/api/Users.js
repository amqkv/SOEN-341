const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const keys = require("../../config/keys");

// router.post("/register", (req, res) => {
//     return res.status(200).json({ msg: "received request" });
// });

module.exports = router;