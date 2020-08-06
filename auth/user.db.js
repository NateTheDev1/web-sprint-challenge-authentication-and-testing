const db = require("../database/dbConfig");

function find() {
  return db("users");
}

function findByUsername(username) {
  return db("users").where({ username }).first();
}

function create(user) {
  return db("users").insert(user);
}

module.exports = { find, findByUsername, create };
