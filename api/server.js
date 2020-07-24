const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const jokesRouter = require("../jokes/jokes-router.js");

const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const verifyCookie = require("../auth/verifyCookie");

const server = express();

const dbConnection = require("../database/dbConfig");
const sessionConfiguration = {
  name: "UserSession", // default value is sid
  secret: process.env.SESSION_SECRET, //key for encryption
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: process.env.USE_SECURE_COOKIES || false,
    httpOnly: true, //prevent JS code on client from accessing this cookie
  },
  resave: false,
  saveUnitialized: true, // read docs, it's related to GDPR compliance
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: "sessions",
    sidfieldname: "sid",
    createTable: true,
    clearInterval: 1000 * 60 * 30, // time to check and remove expired sessions from database
  }),
};

server.use(session(sessionConfiguration));

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/jokes", verifyCookie, authenticate, jokesRouter);

module.exports = server;
