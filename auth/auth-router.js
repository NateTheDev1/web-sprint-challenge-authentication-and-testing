const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const db = require("./user.db");

router.post("/register", handleBody, async (req, res) => {
  const salt = await bcrypt.genSaltSync();

  const hash = await bcrypt.hashSync(req.body.password, salt);

  db.create({ username: req.body.username, password: hash })
    .then((saved) => {
      res.status(201).json({ data: saved });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/login", handleBody, async (req, res) => {
  const { username, password } = req.body;

  const user = await db.findByUsername(username);
  if (!user) {
    res.status(400).json({ error: "Username not found" });
  }

  const verified = await bcrypt.compareSync(password, user.password);
  if (!verified) {
    res.status(400).json({ error: "Password incorrect" });
  }

  req.session.loggedIn = true;
  req.session.username = user.username;
  req.session.uid = user.id;

  const token = await genJWT(user);

  res.status(200).json({ message: "Logged In", token, session: req.session });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        handleError(err, res, "COULD NOT LOGOUT USER");
      } else {
        res.status(204).end();
      }
    });
  } else {
    res.status(200).json({ message: "Already Logged Out" });
  }
});

function genJWT(user) {
  const payload = {
    ...user.id,
    ...user.username,
  };

  const secret = process.env.JWT_SECRET;

  return jwt.sign(payload, secret);
}

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
