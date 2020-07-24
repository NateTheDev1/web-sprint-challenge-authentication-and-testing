const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const db = require("./user.db");

router.post("/register", handleBody, async (req, res) => {
  const salt = await bcrypt.genSaltSync();

  const hash = await bcrypt.hashSync(req.body.password, salt);

  db.create({ username: req.body.username, password: hash }).then((saved) => {
    res.status(200).json({ data: saved });
  });
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
