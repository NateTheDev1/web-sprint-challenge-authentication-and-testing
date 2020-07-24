const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", handleBody, (req, res) => {
  // implement registration
});

router.post("/login", handleBody, (req, res) => {
  // implement login
});

function handleBody(req, res, next) {
  if (
    req.body.hasOwnProperty("username") &&
    req.body.hasOwnProperty("password")
  ) {
    next();
  } else {
    res.status(500).json({ error: "Incorrect Body" });
  }
}

module.exports = router;
