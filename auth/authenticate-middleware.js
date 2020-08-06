/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
require("dotenv").config();

const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET;

  if (!token) {
    return res.status(400).json({ error: "Access Denied" });
  }

  const verified = await jwt.verify(token, secret);
  if (verified) {
    next();
  } else {
    res.status(400).json({ error: "Could not verify token" });
  }
};
